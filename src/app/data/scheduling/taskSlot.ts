import {Period} from './period';
import {SchedulingTask} from './schedulingTask';

export class TaskSlot {
  // The rest we don't care
  staffsRequired: number;
  timeSlot: Period;
  task?: SchedulingTask;
}
