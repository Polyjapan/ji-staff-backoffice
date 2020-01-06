import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SchedulingService} from '../../../../services/scheduling.service';
import {StaffListEntry} from '../../../../data/staffs';
import {SchedulingTask} from '../../../../data/scheduling/schedulingTask';
import {
  AbstractConstraint,
  AssociationConstraint, BannedTaskConstraint, FixedTaskConstraint,
  ScheduleConstraint,
  UnavailableConstraint
} from '../../../../data/scheduling/constraints';
import {InvalidationService} from '../../../../services/invalidation.service';
import Swal from 'sweetalert2';
import {Period} from '../../../../data/scheduling/period';

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
  }

  ngOnInit() {
  }

  submit() {
    if (this.sending) {
      return;
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
    }
  }

  staffToText(staff: StaffListEntry) {
    const details = staff.user.details;
    return details.firstName + ' ' + details.lastName + ' (' + staff.staffNumber + ')';
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

