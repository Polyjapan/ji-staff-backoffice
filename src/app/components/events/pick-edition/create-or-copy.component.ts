import {Component, Inject, OnInit} from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {Event} from '../../../data/event';
import {MatDialog} from '@angular/material/dialog';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {EventCreateComponent} from '../event-create/event-create.component';
import {PickCopyComponent} from './pick-copy.component';

@Component({
  selector: 'app-create-or-copy',
  template: `
      <mat-action-list>
          <button (click)="copy()" mat-list-item>Copier un événement existant</button>
          <button (click)="create()" mat-list-item>Créer un événement vide</button>
      </mat-action-list>
  `
})
export class CreateOrCopyComponent {
  ev: Event[] = undefined;

  constructor(private _bottomSheetRef: MatBottomSheetRef<CreateOrCopyComponent>, private dialog: MatDialog, private bottom: MatBottomSheet,
              @Inject(MAT_BOTTOM_SHEET_DATA) private data: CoCData) {
    this.ev = data.ev;
  }

  create() {
    this._bottomSheetRef.dismiss();
    this.dialog.open(EventCreateComponent);
  }

  copy() {
    this.bottom.open(PickCopyComponent, { data: { ev: this.ev } });
  }
}

export class CoCData {
  ev: Event[];
}
