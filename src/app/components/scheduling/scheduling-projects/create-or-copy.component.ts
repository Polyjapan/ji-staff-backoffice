import {Component, Inject} from '@angular/core';
import {Event} from '../../../data/event';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef, MatDialog} from '@angular/material';
import {PickCopyComponent} from './pick-copy.component';

@Component({
  selector: 'app-create-or-copy-project',
  template: `
    <mat-action-list>
      <button (click)="copy()" mat-list-item>Copier un événement existant</button>
      <button (click)="create()" mat-list-item>Créer un événement vide</button>
    </mat-action-list>
  `
})
export class CreateOrCopyProjectComponent {
  ev: Event[] = undefined;

  constructor(private _bottomSheetRef: MatBottomSheetRef<CreateOrCopyProjectComponent>, private dialog: MatDialog, private bottom: MatBottomSheet,
              @Inject(MAT_BOTTOM_SHEET_DATA) private data: CoCData) {
    this.ev = data.ev;
  }

  create() {
    this._bottomSheetRef.dismiss();
    this.dialog.open(EventCreateComponent);
  }

  copy() {
    this.bottom.open(PickCopyComponent, {data: {ev: this.ev}});
  }
}

export class CoCData {
  ev: Event[];
}
