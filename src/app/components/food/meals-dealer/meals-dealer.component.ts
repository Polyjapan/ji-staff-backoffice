import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {map, startWith, switchMap} from 'rxjs/operators';
import {UserProfile} from '../../../data/user';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meals-dealer',
  templateUrl: './meals-dealer.component.html',
  styleUrls: ['./meals-dealer.component.css']
})
export class MealsDealerComponent implements OnInit {
  meal: string;

  selected = new FormControl();

  persons: SelectableUser[] = [];
  filteredOptions: Observable<SelectableUser[]>;

  // If user types enter without selecting
  selectable: SelectableUser;
  sending = false;
  taken: SelectableUser[] = [];
  notTaken: SelectableUser[] = [];
  private event: number;
  private mealId: number;

  constructor(public ar: ActivatedRoute, public backend: BackendService, private router: Router) {
  }

  refreshEaten() {
    this.taken = undefined;
    this.notTaken = undefined;

    this.backend.getMealTakenBy(this.mealId)
      .pipe(map(takenBy => {
        const takenSet = new Set(takenBy.map(p => p.userId));
        const taken = this.persons.filter(p => takenSet.has(p.userId));
        const notTaken = this.persons.filter(p => !takenSet.has(p.userId));

        return [taken, notTaken];
      })).subscribe(arr => {
      this.taken = arr[0];
      this.notTaken = arr[1];
    });
  }

  submit() {
    // Check selected user
    const v = this.selected.value;

    if (typeof v !== 'string' && v.userId && v.userProfile) {
      this.sendWithUser(v as SelectableUser);
    } else if (this.selectable) {
      this.sendWithUser(this.selectable);
      this.selected.setValue(this.selectable);
    }
  }

  ngOnInit() {

    this.filteredOptions = this.selected.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value.toLowerCase() : this.displayFunc(value)),
        map(name => {
          if (name) {
            if (name.match('^[0-9]+$') !== null) {
              const id = Number.parseInt(name, 10);
              return this.persons.filter(p => p.userId === id);
            } else if (name.match('[0-9]+$') !== null) {
              const id = Number.parseInt(name.match('[0-9]+$')[0], 10);
              return this.persons.filter(p => p.staffNumber === id);
            } else {
              return this.persons.filter(p => this.displayFunc(p).toLowerCase().startsWith(name));
            }
          } else {
            return this.persons;
          }
        })
      );

    this.filteredOptions.subscribe(lst => {
      if (lst && lst.length === 1) {
        this.selectable = lst[0];
      } else {
        this.selectable = undefined;
      }
    });

    this.ar.data
      .pipe(switchMap(data =>
        this.ar.paramMap.pipe(map(params => [data.eventId, Number.parseInt(params.get('meal'), 10)]))
      ))
      .subscribe(results => {
        this.mealId = results[1];
        this.event = results[0];

        this.backend.getMeal(this.mealId).subscribe(meal => this.meal = meal.name);
        this.backend.getStaffs(this.event)
          .pipe(switchMap(staffs => this.backend.getAdmins().pipe(map(admins => {
            const array: SelectableUser[] = [];
            admins.forEach(adm => array.push({userId: adm.id, profile: adm}));
            staffs.forEach(staff => array.push({userId: staff.user.id, profile: staff.user, staffNumber: staff.staffNumber}));
            return array;
          })))).subscribe(p => {
          this.persons = p.sort((a, b) => {
            if (a.staffNumber && !b.staffNumber) {
              return 1;
            } else if (b.staffNumber && !a.staffNumber) {
              return -1;
            } else {
              return this.displayFunc(a).localeCompare(this.displayFunc(b));
            }
          });
          this.refreshEaten();
        });
      });
  }

  displayFunc(user: SelectableUser): string {
    if (!user) {
      return undefined;
    }

    const name = user.profile.details.firstName + ' ' + user.profile.details.lastName;
    if (user.staffNumber) {
      return name + ' (staff #' + user.staffNumber + ')';
    } else {
      return name + ' (comité/équipier)';
    }
  }

  private sendWithUser(user: SelectableUser) {
    Swal.fire({
      titleText: 'Confirmer ?',
      html: 'Confirmez vous que <b>' + user.profile.details.firstName + ' ' + user.profile.details.lastName + '</b> souhaite prendre son repas ?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      icon: 'question'
    }).then(res => {
      if (res.value === true) {
        if (this.sending) {
          return;
        }
        this.sending = true;
        this.backend.mealTakenBy(this.mealId, user.userId).subscribe(rep => {
          if (rep === false) {
            Swal.fire('Johnny veut du rab', 'Cette personne a déjà mangé.', 'warning');
          } else {
            Swal.fire('OK!', 'Tu peux donner son repas à cette personne :D', 'success');
          }

          this.refreshEaten();
          this.sending = false;
          this.selectable = undefined;
          this.selected.reset();
        }, err => {
          console.log(err);
          Swal.fire('Une erreur s\'est produite', undefined, 'error');
          this.sending = false;
        });
      }
    });
  }

}

class SelectableUser {
  staffNumber?: number;
  userId: number;
  profile: UserProfile;
}
