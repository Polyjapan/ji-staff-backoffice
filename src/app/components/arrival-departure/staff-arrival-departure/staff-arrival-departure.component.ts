import {Component, Input, OnInit} from '@angular/core';
import {MissingStaffs} from '../../../data/staffs';
import {BackendService} from '../../../services/backend.service';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import {ReducedUser} from '../../../data/user';

@Component({
  selector: 'app-staff-arrival-departure',
  templateUrl: './staff-arrival-departure.component.html',
  styleUrls: ['./staff-arrival-departure.component.css']
})
export class StaffArrivalDepartureComponent implements OnInit {
  @Input() type: 'arrival' | 'departure';

  eventId: number;
  status: MissingStaffs;
  textfield: string;
  working = false;

  private send(staffId: number): Observable<ReducedUser> {
    if (this.type === 'arrival') {
      return this.backend.staffArrived(this.eventId, staffId);
    } else {
      return this.backend.staffLeft(this.eventId, staffId);
    }
  }

  submit(field: HTMLInputElement) {
    try {
      const staffId = Number.parseInt(this.textfield, 10);

      if (this.working) {
        return;
      }
      this.working = true;
      this.send(staffId).subscribe(res => {
        this.refresh();
        this.textfield = '';
        this.working = false;
        Swal.fire({
          title: 'OK!',
          html: 'C\'est tout bon pour <b>' + res.firstName + ' ' + res.lastName + '</b>',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true
        }).then(_ => field.focus());

      }, err => {
        this.working = false;
        console.log(err);
        Swal.fire('Erreur inconnue', err.message , 'error').then(_ => field.focus());
      });
    } catch (e) {
      Swal.fire('Mauvais id de staff...', undefined, 'error').then(_ => field.focus());
    }
  }

  private refresh() {
    const req = this.type === 'arrival' ? this.backend.getNotArrivedStaffs(this.eventId) : this.backend.getNotLeftStaffs(this.eventId);

    req.subscribe(res => this.status = res);
  }

  constructor(private backend: BackendService, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.ar.data
      .subscribe(ev => {
        this.eventId = ev.eventId;
        this.refresh();
      });
  }

}
