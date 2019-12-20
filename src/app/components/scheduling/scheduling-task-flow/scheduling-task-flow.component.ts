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
  partitions;
  slots;

  start = '17:15';
  date = '15/02/1999';

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

    /*
    From URL params, detect if it's a NEW task or an EXISTING task (resp. CREATE/EDIT).
    Get all the data from the server at each step.
     */

    /*
    Use the completed attribute of the tasks
     */

    /*
    Use modals for partition creation and edition as they need a lot of shitty checkboxes
     */

    /*
    Use a big nice button on third step
     */
  }

}
