import {Event} from '../event';

export class SchedulingProject {
  projectId?: number;
  event: number;
  projectTitle: string;
  maxTimePerStaff: number;
  minBreakMinutes: number;
  maxSameShiftType: number;
}

export class CreateSchedulingProject {
  name: string;
  maxHoursPerStaff: number;
  minBreakMinutes: number;
  maxSameShiftType: number;
  copyOf?: number;
  copyConstraints?: boolean;
}
