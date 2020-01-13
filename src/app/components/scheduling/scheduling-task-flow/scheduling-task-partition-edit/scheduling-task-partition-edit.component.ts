import {Component, Inject, OnInit} from '@angular/core';
import {Event} from '../../../../data/event';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {SchedulingService} from '../../../../services/scheduling.service';
import {PartitionRule, SchedulingTaskPartition} from '../../../../data/scheduling/schedulingTaskPartition';
import {Period} from '../../../../data/scheduling/period';

@Component({
  selector: 'app-scheduling-task-partition-edit',
  templateUrl: './scheduling-task-partition-edit.component.html',
  styleUrls: ['./scheduling-task-partition-edit.component.css']
})
export class SchedulingTaskPartitionEditComponent implements OnInit {
  partition: SchedulingTaskPartition;
  project: number;
  sending: boolean = false;
  Rule = PartitionRule;

  constructor(
    public dialogRef: MatDialogRef<SchedulingTaskPartitionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SchedulingTaskPartitionEditData,
    private backend: SchedulingService) {

    this.project = data.project;
    if (data.partition) {
      this.partition = data.partition;
    } else {
      this.partition = new SchedulingTaskPartition();
      this.partition.task = data.task;
      this.partition.slot = new Period();
      this.partition.alternateShifts = false;
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
      if (this.partition.taskPartitionId) {
        this.backend
          .updateTaskPartition(this.project, this.partition)
          .subscribe(u => {
            this.dialogRef.close(this.partition);
          });
      } else {
        this.backend
          .createTaskPartition(this.project, this.partition)
          .subscribe(targetId => {
            this.partition.taskPartitionId = targetId;
            this.dialogRef.close(this.partition);
          });
      }
    } catch (e) {
      e.print();
      console.log(e);
      this.sending = false;
    }
  }

}

export class SchedulingTaskPartitionEditData {
  partition?: SchedulingTaskPartition;
  task: number;
  project: number;
}
