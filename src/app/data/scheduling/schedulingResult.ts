import {TaskSlot} from './taskSlot';


export class SchedulingResult {
  notFullSlots: TaskSlot[];
  averageHoursPerStaff: number;
  stdHoursPerStaff: number;
}
