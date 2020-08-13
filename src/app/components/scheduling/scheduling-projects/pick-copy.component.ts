import {Component, Inject} from '@angular/core';
import {Event} from '../../../data/event';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {CoCData} from './create-or-copy.component';
import {SchedulingProject} from '../../../data/scheduling/schedulingProject';
import {
  SchedulingProjectCreateComponent,
  SchedulingProjectCreateData
} from '../scheduling-project-create/scheduling-project-create.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-scheduling-pick-copy',
  template: `
    <h3>Quel planning copier ?</h3>
    <mat-action-list>
      <ng-container *ngFor="let item of projects | keyvalue">
        <h3 mat-subheader>{{projectName(item.key)}}</h3>
        <button *ngFor="let p of item.value" (click)="copy(p.projectId)" mat-list-item>{{p.projectTitle}}</button>
      </ng-container>
    </mat-action-list>
  `
})
export class PickSchedulingCopyComponent {
  projects: Map<number, SchedulingProject[]>;
  events: Map<number, Event>;

  constructor(private _bottomSheetRef: MatBottomSheetRef<PickSchedulingCopyComponent>, private dialog: MatDialog,
              @Inject(MAT_BOTTOM_SHEET_DATA) private data: CoCData) {
    this.projects = data.projects;
    this.events = data.events;

    console.log(this.data);
  }

  copy(project: number) {
    const create: SchedulingProjectCreateData = {eventId: this.data.eventId, copyOf: project};

    this._bottomSheetRef.dismiss();
    this.dialog.open(SchedulingProjectCreateComponent, {data: create});
  }

  projectName(key: number) {
    return this.events.get(key).name;
  }
}
