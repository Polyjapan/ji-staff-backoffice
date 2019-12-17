import {Component, Inject} from '@angular/core';
import {Event} from '../../../data/event';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog} from '@angular/material';
import {EventCreateComponent, EventCreateData} from '../event-create/event-create.component';
import {CoCData} from './create-or-copy.component';
import {SchedulingProject} from '../../../data/scheduling/schedulingProject';

@Component({
  selector: 'app-scheduling-pick-copy',
  template: `
    <h3>Quel projet copier ?</h3>
    <mat-action-list>
      <ng-container *ngFor="let item of projects | keyvalue">
        <h3 mat-subheader>{{projectName(item.key)}}</h3>
        <button *ngFor="let e of ev" (click)="copy(e)" mat-list-item>{{e.name}} ({{e.eventBegin}})</button>
        <mat-divider></mat-divider>
      </ng-container>
    </mat-action-list>
  `
})
export class PickSchedulingCopyComponent {
  projects: Map<number, SchedulingProject[]>;
  events: Map<number, Event>;

  constructor(private _bottomSheetRef: MatBottomSheetRef<PickSchedulingCopyComponent>, private dialog: MatDialog,
              @Inject(MAT_BOTTOM_SHEET_DATA) private data: CoCData) {
    this.ev = data.ev;
  }

  copy(ev: Event) {
    const target = new Event();
    target.eventBegin = ev.eventBegin;
    target.name = ev.name;

    const create: EventCreateData = {event: target, copyOf: ev.eventId};

    this._bottomSheetRef.dismiss();
    this.dialog.open(EventCreateComponent, {data: create});
  }

  projectName(key: number) {
    return this.events.get(key).name;
  }
}
