import {Event} from '../event';

export class SchedulingProject {
  projectId?: number;
  event: number;
  projectTitle: string;
  maxTimePerStaff: number;
  minBreakMinutes: number;
}

export class CreateSchedulingProject {
  name: string;
  maxHoursPerStaff: number;
  minBreakMinutes: number;
  copyOf?: number;
  copySlots?: boolean;
  copyConstraints?: boolean;
}
