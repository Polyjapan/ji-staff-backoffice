import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../../services/backend.service';
import 'rxjs-compat/add/operator/mergeMap';
import {Event} from '../../../data/event';
import 'rxjs-compat/add/operator/filter';
import {InvalidationService} from '../../../services/invalidation.service';
import {Form} from '../../../data/form';
import {ApplicationState} from '../../../data/state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css']
})
export class EventHomeComponent implements OnInit {
  forms: Form[];
  event: Event;
  states: Map<ApplicationState, number>;
  copying = false;
  ApplicationState = ApplicationState;


  constructor(private ar: ActivatedRoute, private back: BackendService, private invalidate: InvalidationService) {
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
        this.back.getEditionStats(this.event.id).subscribe(map => {
          this.states = new Map();

          for (const pair of map) {
            this.states.set(pair[0], pair[1]);
          }
        });
        this.invalidate.listen('forms-' + this.event.id, (tag) => this.refreshForms());
      });
  }

  private refreshForms() {
    this.forms = undefined;
    this.back.getForms(this.event.id).subscribe(forms => this.forms = forms);
  }

  copy() {
    if (this.copying) {
      return;
    }
    this.copying = true;

    this.back.getEditions().subscribe(events => {
      const map = new Map<string, string>();
      events.filter(e => e.id !== this.event.id)
        .forEach(ev => map.set(ev.id.toString(10), ev.name));

      const box = Swal.fire({
        title: 'Choisir l\'événement à cloner',
        input: 'select',
        inputOptions: map,
        showLoaderOnConfirm: true
      });

      box.then(v => {
        if (v.isConfirmed) {
          this.back.cloneEvent(Number.parseInt(v.value as string, 10), this.event.id).subscribe(res => {
            Swal.close();
            this.refreshForms();
            Swal.fire('Parfait', 'Les formulaires ont bien été copiés !', 'success');
            this.copying = false;
          });
        } else {
          this.copying = false;
        }
      });
    });
  }
}
