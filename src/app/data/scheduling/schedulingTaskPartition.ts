import {Period} from './period';

export class SchedulingTaskPartition {
  taskPartitionId?: number;
  task: number;
  staffsRequired: number;
  shiftDuration: number; // in minutes
  slot: Period;
  alternateShifts: boolean;
}
