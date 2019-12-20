import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {SchedulingTaskPartitionEditComponent} from '../scheduling-task-partition-edit/scheduling-task-partition-edit.component';
import {SchedulingTask} from '../../../../data/scheduling/schedulingTask';
import {SchedulingService} from '../../../../services/scheduling.service';
import {StaffListEntry} from '../../../../data/staffs';
import {SchedulingTaskPartition} from '../../../../data/scheduling/schedulingTaskPartition';

@Component({
  selector: 'app-scheduling-task-partitions',
  templateUrl: './scheduling-task-partitions.component.html',
  styleUrls: ['./scheduling-task-partitions.component.css']
})
export class SchedulingTaskPartitionsComponent implements OnInit {
  @Input('task') task: number;
  @Input('project') project: number;
  partitions: MatTableDataSource<SchedulingTaskPartition>;


  constructor(private dialog: MatDialog, private backend: SchedulingService) { }

  ngOnInit() {
    this.reloadTable();
  }

  create() {
    this.dialog.open(SchedulingTaskPartitionEditComponent, {data: {task: this.task, project: this.project}})
      .afterClosed()
      .subscribe((partition: SchedulingTaskPartition) => {
        if (partition && partition.taskPartitionId) {
          this.partitions.data.push(this.changePartitionDate(partition));
          this.reloadTable();
        }
      });
  }

  private changePartitionDate(part: SchedulingTaskPartition) {
    if (typeof(part.slot.day) === 'string') {
      return part;
    }
    const date = part.slot.day as unknown as Date;
    part.slot.day = date.toDateString();
    return part;
  }

  private reloadTable() {
    this.partitions = undefined;

    this.backend.getTaskPartitions(this.project, this.task)
      .subscribe(part => this.partitions = new MatTableDataSource(part));
  }

  edit(partition: SchedulingTaskPartition) {

    this.dialog.open(SchedulingTaskPartitionEditComponent, {data: {task: this.task, project: this.project, partition}})
      .afterClosed()
      .subscribe((newPartition: SchedulingTaskPartition) => {
        if (partition && partition.taskPartitionId) {
          // Remove
          const id = this.partitions.data.findIndex(s => s.taskPartitionId === partition.taskPartitionId);
          // Readd
          this.partitions.data[id] = this.changePartitionDate(partition);
          this.reloadTable();
        }
      });
  }

  remove(partition: SchedulingTaskPartition) {
    this.backend.deleteTaskPartition(this.project, this.task, partition.taskPartitionId)
      .subscribe(_ => {
          this.reloadTable();
      });
  }


}
