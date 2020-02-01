import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SchedulingService} from '../../../../services/scheduling.service';
import {StaffListEntry} from '../../../../data/staffs';
import {SchedulingTask} from '../../../../data/scheduling/schedulingTask';
import {
  AssociationConstraint,
  BannedTaskConstraint,
  BannedTaskTypeConstraint,
  FixedTaskConstraint,
  ScheduleConstraint,
  UnavailableConstraint
} from '../../../../data/scheduling/constraints';
import {InvalidationService} from '../../../../services/invalidation.service';
import Swal from 'sweetalert2';
import {Period} from '../../../../data/scheduling/period';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-create-constraint',
  templateUrl: './create-constraint.component.html',
  styleUrls: ['./create-constraint.component.css']
})
export class CreateConstraintComponent implements OnInit {
  sending = false;
  constraint: ScheduleConstraint;

  constructor(
    public dialogRef: MatDialogRef<CreateConstraintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateConstraintData,
    private backend: SchedulingService,
    private inval: InvalidationService) {
    this.constraint = data.constraint;

    // Scotch
    if (this.constraint.constraintType === 'AssociationConstraint') {
      ((this.constraint.constraint) as AssociationConstraint).together = false;
    }
    if (this.constraint.constraintType === 'UnavailableConstraint') {
      ((this.constraint.constraint) as UnavailableConstraint).period = new Period();
    }
    if (this.constraint.constraintType === 'FixedTaskConstraint') {
      ((this.constraint.constraint) as FixedTaskConstraint).period = new Period();
    }
  }

  ngOnInit() {
  }

  submit() {
    if (this.sending) {
      return;
    }

    // Scotch bis
    if (this.constraint.constraintType === 'FixedTaskConstraint') {
      const period = this.ftc(this.constraint).period;

      if (isNullOrUndefined(period.day) || isNullOrUndefined(period.end) || isNullOrUndefined(period.start)) {
        this.ftc(this.constraint).period = undefined;
      }
    }

    this.sending = true;
    try {
      this.backend
        .createConstraint(this.data.projectId, this.constraint)
        .subscribe(targetId => {
          this.inval.invalidate('constraints');
          this.dialogRef.close();
          Swal.fire('Contrainte ajoutée', 'La contrainte a bien été ajoutée', 'success');
        });
    } catch (e) {
      e.print();
      console.log(e);
      this.sending = false;
      if (this.constraint.constraintType === 'FixedTaskConstraint') {
        if (!this.ftc(this.constraint).period) {
          this.ftc(this.constraint).period = new Period();
        }
      }
    }
  }

  staffToText(staff: StaffListEntry) {
    const details = staff.user.details;
    return staff.staffNumber + ' - ' + details.firstName + ' ' + details.lastName;
  }

  ac(constraint: ScheduleConstraint): AssociationConstraint {
    return this.constraint.constraint as AssociationConstraint;
  }

  uc(constraint: ScheduleConstraint): UnavailableConstraint {
    return this.constraint.constraint as UnavailableConstraint;
  }

  btc(constraint: ScheduleConstraint): BannedTaskConstraint {
    return this.constraint.constraint as BannedTaskConstraint;
  }

  bttc(constraint: ScheduleConstraint): BannedTaskTypeConstraint {
    return this.constraint.constraint as BannedTaskTypeConstraint;
  }

  ftc(constraint: ScheduleConstraint): FixedTaskConstraint {
    return this.constraint.constraint as FixedTaskConstraint;
  }

  taskToText(task: SchedulingTask) {
    return task.name;
  }


}

export interface CreateConstraintData {
  projectId: number;
  staffs: Map<number, StaffListEntry>;
  tasks: Map<number, SchedulingTask>;
  constraint: ScheduleConstraint;
}

