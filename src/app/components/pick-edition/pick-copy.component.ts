import {Component, Inject, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {Event} from '../../data/event';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef, MatDialog} from '@angular/material';
import {EventCreateComponent, EventCreateData} from '../event-create/event-create.component';
import {CoCData} from './create-or-copy.component';

@Component({
  selector: 'app-pick-copy',
  template: `
    <h3>Quel événement copier ?</h3>
      <mat-action-list>
          <button *ngFor="let e of ev" (click)="copy(e)" mat-list-item>{{e.name}} ({{e.eventBegin}})</button>
      </mat-action-list>
  `
})
export class PickCopyComponent {
  ev: Event[] = undefined;

  constructor(private _bottomSheetRef: MatBottomSheetRef<PickCopyComponent>, private dialog: MatDialog,
              @Inject(MAT_BOTTOM_SHEET_DATA) private data: CoCData) {
    this.ev = data.ev;
  }

  copy(ev: Event) {
    const target = new Event();
    target.eventBegin = ev.eventBegin;
    target.name = ev.name;

    const create: EventCreateData = { event: target, copyOf: ev.eventId };

    this._bottomSheetRef.dismiss();
    this.dialog.open(EventCreateComponent, { data: create });
  }
}
