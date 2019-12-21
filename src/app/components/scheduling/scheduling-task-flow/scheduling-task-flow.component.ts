import { Component, OnInit } from '@angular/core';
import {SchedulingTask} from '../../../data/scheduling/schedulingTask';
import {ActivatedRoute} from '@angular/router';
import {SchedulingService} from '../../../services/scheduling.service';

@Component({
  selector: 'app-scheduling-task-flow',
  templateUrl: './scheduling-task-flow.component.html',
  styleUrls: ['./scheduling-task-flow.component.css']
})
export class SchedulingTaskFlowComponent implements OnInit {
  projectId: number;
  taskId: number;
  loading = true;

  task = new SchedulingTask();

  constructor(private ar: ActivatedRoute, private backend: SchedulingService) {
    this.task.projectId = 1;

  }

  ngOnInit() {
    this.ar.paramMap.subscribe(map => {
      this.projectId = Number.parseInt(map.get('project'), 10);

      if (map.has('task')) {
        this.taskId = Number.parseInt(map.get('task'), 10);
        this.backend.getTask(this.projectId, this.taskId)
          .subscribe(task => {
            this.task = task;
            this.loading = false;
          });
      } else {
        this.task = new SchedulingTask();
        this.task.projectId = this.projectId;
        this.loading = false;
      }
    });
  }
}
