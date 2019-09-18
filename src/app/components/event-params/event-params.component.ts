import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import 'rxjs-compat/add/operator/mergeMap';
import {Event} from '../../data/event';
import 'rxjs-compat/add/operator/filter';
import {MatDialog, MatSlideToggleChange} from '@angular/material';
import {EventCreateComponent, EventCreateData} from '../event-create/event-create.component';
import {InvalidationService} from '../../services/invalidation.service';

@Component({
  selector: 'app-event-params',
  templateUrl: './event-params.component.html',
  styleUrls: ['./event-params.component.css']
})
export class EventParamsComponent implements OnInit {
  event: Event;
  updatingActivation = false;

  constructor(private ar: ActivatedRoute, private back: BackendService, private dialog: MatDialog,
              private invalidate: InvalidationService) {
  }

  ngOnInit() {
    this.ar.data
      .filter(d => d.event)
      .map(d => d.event)
      .subscribe(ev => this.event = ev);
  }

  edit() {
    const create: EventCreateData = {event: this.event};
    this.dialog.open(EventCreateComponent, {data: create});
  }

  toggleActivate($event: MatSlideToggleChange) {
    console.log($event);
    this.updatingActivation = true;

    this.back.updateActive(this.event.eventId, $event.checked)
      .subscribe(u => {
        this.invalidate.invalidate('event-' + this.event.eventId);
        this.updatingActivation = false;
      });
  }
}
