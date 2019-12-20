import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateUpdateTask, SchedulingTask} from '../../../../data/scheduling/schedulingTask';
import {MatStep, MatStepper} from '@angular/material';
import {SchedulingService} from '../../../../services/scheduling.service';

@Component({
  selector: 'app-scheduling-task-create',
  templateUrl: './scheduling-task-create.component.html',
  styleUrls: ['./scheduling-task-create.component.css']
})
export class SchedulingTaskCreateComponent implements OnInit {
  @Input('task') task: SchedulingTask;
  @Input('stepper') stepper: MatStepper;
  @Input('step') step: MatStep;

  dirty: boolean = false;
  sending: boolean = false;

  constructor(private backend: SchedulingService) {
  }

  get isNew() {
    return !this.task || this.task.id === undefined;
  }

  private updateCompleted() {
    if (this.isNew || this.dirty) {
      this.step.completed = false;
    } else {
      this.step.completed = true;
    }
  }

  get taskAsUpdate(): CreateUpdateTask {
    const self = this;
    return {
      name: self.task.name,
      minAge: self.task.minAge,
      minExperience: self.task.minExperience,
      difficulties: [] // todo
    };
  }

  ngOnInit() {
    this.updateCompleted();
  }

  onEdit() {
    if (this.dirty) {
      return;
    }
    this.dirty = true;
    this.updateCompleted();
  }

  send() {
    if (this.sending) {
      return;
    }

    if (this.step.completed) {
      this.stepper.next();
      return;
    }

    this.sending = true;
    try {
      if (this.isNew) {
        this.backend
          .createTask(this.task.projectId, this.taskAsUpdate)
          .subscribe(targetId => {
            this.task.id = targetId;
            this.dirty = false;
            this.sending = false;
            this.updateCompleted();
            this.stepper.next();
          });
      } else {
        this.backend.updateTask(this.task.projectId, this.task.id, this.taskAsUpdate)
          .subscribe(u => {
            this.dirty = false;
            this.sending = false;
            this.updateCompleted();
            this.stepper.next();
          });
      }
    } catch (e) {
      e.print();
      console.log(e);
      this.sending = false;
    }
  }

}
