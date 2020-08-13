import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {
  AbstractConstraint,
  AssociationConstraint,
  BannedTaskConstraint,
  FixedTaskConstraint,
  UnavailableConstraint,
  buildScheduleConstraint, BannedTaskTypeConstraint
} from '../../../data/scheduling/constraints';
import {SchedulingTask} from '../../../data/scheduling/schedulingTask';
import {StaffListEntry} from '../../../data/staffs';
import {CreateConstraintComponent} from './create-constraint/create-constraint.component';

@Component({
  selector: 'app-create-or-copy-project',
  template: `
    <h3>Choisissez le type de contrainte</h3>
    <mat-action-list>
      <button *ngFor="let item of types | keyvalue" (click)="process(item.value)" mat-list-item>{{item.key}}</button>
    </mat-action-list>
  `
})
export class CreateConstraintTypeComponent implements OnInit {
  types = new Map<string, AbstractConstraint>();

  constructor(private _bottomSheetRef: MatBottomSheetRef<CreateConstraintTypeComponent>,
              private dialog: MatDialog, private bottom: MatBottomSheet,
              @Inject(MAT_BOTTOM_SHEET_DATA) private data: CCData) {
  }

  ngOnInit(): void {
    this.types.clear();
    this.types.set('Staffs à mettre tjrs/jamais ensemble', new AssociationConstraint());
    this.types.set('Staff absent', new UnavailableConstraint());
    this.types.set('Staff interdit à un poste', new BannedTaskConstraint());
    this.types.set('Staff interdit à un type de poste', new BannedTaskTypeConstraint());
    this.types.set('Staff forcé sur un poste', new FixedTaskConstraint());
  }

  process(constraint: AbstractConstraint) {
    this._bottomSheetRef.dismiss();
    this.dialog.open(CreateConstraintComponent, {data: {projectId: this.data.projectId, staffs: this.data.staffs, tasks: this.data.tasks, constraint: buildScheduleConstraint(constraint)}});
  }
}

export class CCData {
  projectId: number;
  staffs: Map<number, StaffListEntry>;
  tasks: Map<number, SchedulingTask>;
}
