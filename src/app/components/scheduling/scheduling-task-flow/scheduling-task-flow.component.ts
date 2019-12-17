import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduling-task-flow',
  templateUrl: './scheduling-task-flow.component.html',
  styleUrls: ['./scheduling-task-flow.component.css']
})
export class SchedulingTaskFlowComponent implements OnInit {
  task;
  partitions;
  slots;

  constructor() { }

  ngOnInit() {
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
