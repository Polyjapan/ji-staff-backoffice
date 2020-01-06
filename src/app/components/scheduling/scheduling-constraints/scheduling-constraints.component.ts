import {Component, OnDestroy, OnInit} from '@angular/core';
import {SchedulingTask} from '../../../data/scheduling/schedulingTask';
import {SchedulingService} from '../../../services/scheduling.service';
import {ActivatedRoute} from '@angular/router';
import {StaffListEntry} from '../../../data/staffs';
import {BackendService} from '../../../services/backend.service';
import {AbstractConstraint, ScheduleConstraint, UnavailableConstraint} from '../../../data/scheduling/constraints';
import {displayPeriod} from '../../../data/scheduling/period';
import {MatBottomSheet} from '@angular/material';
import {CreateConstraintTypeComponent} from './create-constraint-type.component';
import {InvalidationService, SubscribedListener} from '../../../services/invalidation.service';

@Component({
  selector: 'app-scheduling-constraints',
  templateUrl: './scheduling-constraints.component.html',
  styleUrls: ['./scheduling-constraints.component.css']
})
export class SchedulingConstraintsComponent implements OnInit, OnDestroy {
  project: number;
  eventId: number;
  constraints: ScheduleConstraint[];
  staffs: Map<number, StaffListEntry>;
  tasks: Map<number, SchedulingTask>;

  private invalListener: SubscribedListener;

  constructor(private backend: SchedulingService, private staffsBackend: BackendService, private ar: ActivatedRoute,
              private bottomSheet: MatBottomSheet, private inval: InvalidationService) {
  }

  openBottomSheet() {
    this.bottomSheet.open(CreateConstraintTypeComponent, {
      data: {projectId: this.project, staffs: this.staffs, tasks: this.tasks}
    });
  }

  ngOnInit() {
    this.ar.paramMap.subscribe(map => {
      this.project = Number.parseInt(map.get('project'), 10);
    });
    this.ar.data.subscribe(data => this.eventId = data.eventId);
    this.backend.getTasks(this.project).subscribe(data => {
      this.tasks = new Map<number, SchedulingTask>();
      data.forEach(task => this.tasks.set(task.id, task));
    });
    this.staffsBackend.getStaffs(this.eventId).subscribe(staffs => {
      this.staffs = new Map<number, StaffListEntry>();
      staffs.forEach(staff => this.staffs.set(staff.user.id, staff));
    });
    this.refreshConstraints();
    this.invalListener = this.inval.listen('constraints', () => this.refreshConstraints());
  }

  getBoolean(constraint: AbstractConstraint, field: string = 'together') {
    const val = constraint[field];
    if (!val) {
      return false;
    } else {
      return val === 'true' || val;
    }
  }

  getStaff(constraint: AbstractConstraint, field: string = 'staffId') {
    return this.getFieldAsNum(constraint, field, staffId => {
      if (!this.staffs || !this.staffs.has(staffId)) {
        return '#' + staffId;
      } else {
        const staff = this.staffs.get(staffId);
        const details = staff.user.details;
        return details.firstName + ' ' + details.lastName + ' (' + staff.staffNumber + ')';
      }
    });
  }

  getTask(constraint: AbstractConstraint, field: string = 'taskId') {
    return this.getFieldAsNum(constraint, field, taskId => {
      if (!this.tasks || !this.tasks.has(taskId)) {
        return 't' + taskId;
      } else {
        const task = this.tasks.get(taskId);
        return task.name;
      }
    });
  }

  getPeriod(constraint: AbstractConstraint) {
    const ct = constraint as UnavailableConstraint;
    return displayPeriod(ct.period);
  }

  private refreshConstraints() {
    this.backend.getConstraints(this.project).subscribe(constraints => this.constraints = constraints);
  }

  private getFieldAsNum(constraint: AbstractConstraint, field: string, mapper: (n: number) => string) {
    const val = constraint[field];
    if (!val) {
      return '???';
    } else {
      const id = Number.parseInt(val, 10);
      return mapper.apply(this, [id]);
    }
  }

  ngOnDestroy(): void {
    this.invalListener.cancel();
  }

  delete(constraint: ScheduleConstraint) {
    this.backend.deleteConstraint(this.project, constraint).subscribe(s => this.refreshConstraints());
  }
}
