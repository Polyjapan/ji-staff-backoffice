import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../services/backend.service';
import {Meal} from '../../../data/meals';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-meals-selector',
  templateUrl: './meals-selector.component.html',
  styleUrls: ['./meals-selector.component.css']
})
export class MealsSelectorComponent implements OnInit {
  meals: Meal[];

  createMealName: string;
  creatingMeal: boolean;

  selectedField: number;
  updatingStaffParticularties = false;
  updatingAdminParticularties = false;
  foodParts: Map<number, string>;
  adminMap: Map<number, string>;
  private eventId: number;

  constructor(public ar: ActivatedRoute, public backend: BackendService, private router: Router) {
  }

  ngOnInit() {
    this.ar.data
      .subscribe(ev => {
        this.eventId = ev.eventId;
        this.refresh();
      });
  }

  refresh() {
    this.backend.getMeals(this.eventId).subscribe(meals => this.meals = meals);
    this.backend.getAdminFoodParticularities().subscribe(parts => this.foodParts = parts);
    this.backend.getAdmins()
      .pipe(map(admins => {
        const adminMap: Map<number, string> = new Map();
        admins.forEach(profile => adminMap.set(profile.id, profile.details.firstName + ' ' + profile.details.lastName));
        return adminMap;
      }))
      .subscribe(adminMap => this.adminMap = adminMap);
  }

  adminToString(adminId: number) {
    if (!this.adminMap) {
      return '???';
    }
    return this.adminMap.get(adminId);
  }

  createMeal() {
    if (this.creatingMeal) {
      return;
    }
    this.creatingMeal = true;
    const meal: Meal = {eventId: this.eventId, name: this.createMealName};

    this.backend.createMeal(meal).subscribe(
      succ => this.router.navigate([succ], {relativeTo: this.ar}),
      err => {
        Swal.fire('Une erreur s\'est produite...', undefined, 'error');
        this.creatingMeal = false;
      }
    );
  }

  updateStaffParticularities() {
    if (this.updatingStaffParticularties) {
      return;
    }
    this.updatingStaffParticularties = true;

    this.backend.setStaffFoodParticularities(this.eventId, this.selectedField)
      .subscribe(succ => {
        this.updatingStaffParticularties = false;
        Swal.fire('OK', 'Le champ de formulaire contenant les particularités alimentaires a bien été mis à jour', 'success');
      }, err => {
        this.updatingStaffParticularties = false;
        Swal.fire('Erreur', 'La mise a jour a échoué, merci de bien vouloir réessayer.', 'error');
      });
  }

  updateAdminParticularities() {
    if (this.updatingAdminParticularties) {
      return;
    }
    this.updatingAdminParticularties = true;

    console.log(this.foodParts);

    this.backend.setAdminFoodParticularities(this.foodParts)
      .subscribe(succ => {
        this.updatingAdminParticularties = false;
        Swal.fire('OK', 'Les préférences alimentaires des comités ont bien été mises à jour', 'success');
      }, err => {
        this.updatingAdminParticularties = false;
        Swal.fire('Erreur', 'La mise a jour a échoué, merci de bien vouloir réessayer.', 'error');
      });
  }
}
