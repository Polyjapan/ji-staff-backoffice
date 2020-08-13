import {Component, Inject} from '@angular/core';
import {Event} from '../../../data/event';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {SchedulingProjectCreateComponent} from '../scheduling-project-create/scheduling-project-create.component';
import {SchedulingProject} from '../../../data/scheduling/schedulingProject';
import {PickSchedulingCopyComponent} from './pick-copy.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-or-copy-project',
  template: `
    <mat-action-list>
      <button (click)="copy()" mat-list-item>Copier un planning existant</button>
      <button (click)="create()" mat-list-item>Créer un planning vide</button>
    </mat-action-list>
  `
})
export class CreateOrCopyProjectComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<CreateOrCopyProjectComponent>,
              private dialog: MatDialog, private bottom: MatBottomSheet,
              @Inject(MAT_BOTTOM_SHEET_DATA) private data: CoCData) {
  }

  create() {
    this._bottomSheetRef.dismiss();
    this.dialog.open(SchedulingProjectCreateComponent, {data: {eventId: this.data.eventId}});
  }

  copy() {
    this.bottom.open(PickSchedulingCopyComponent, {data: this.data});
  }
}

export class CoCData {
  eventId: number;
  projects: Map<number, SchedulingProject[]>;
  events: Map<number, Event>;
}
