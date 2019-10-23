import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import 'rxjs-compat/add/operator/mergeMap';
import {Event} from '../../data/event';
import 'rxjs-compat/add/operator/filter';
import {MatDialog, MatSlideToggleChange} from '@angular/material';
import {EventCreateComponent, EventCreateData} from '../event-create/event-create.component';
import {InvalidationService} from '../../services/invalidation.service';
import {Form} from '../../data/form';
import {ApplicationState} from '../../data/state';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css']
})
export class EventHomeComponent implements OnInit {
  forms: Form[];
  event: Event;
  states: Map<ApplicationState, number>;
  updatingActivation = false;
  ApplicationState = ApplicationState;

  constructor(private ar: ActivatedRoute, private back: BackendService, private dialog: MatDialog,
              private invalidate: InvalidationService) {
  }

  get totalApplications() {
    let sum = 0;
    for (const a of this.states.values()) {
      sum += a;
    }
    return sum;
  }

  countApplications(state) {
    if (this.states.has(state)) {
      return this.states.get(state);
    } else {
      return 0;
    }
  }

  ngOnInit() {
    this.ar.data
      .filter(d => d.event)
      .map(d => d.event)
      .subscribe(ev => {
        this.event = ev;
        this.refreshForms();
        this.back.getEditionStats(this.event.eventId).subscribe(map => {
          this.states = new Map();

          for (const pair of map) {
            this.states.set(pair[0], pair[1]);
          }
        });
        this.invalidate.listen('forms-' + this.event.eventId, (tag) => this.refreshForms());
      });
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

  private refreshForms() {
    this.forms = undefined;
    this.back.getForms(this.event.eventId).subscribe(forms => this.forms = forms);
  }
}
