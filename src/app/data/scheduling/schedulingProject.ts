import {Event} from '../event';

export class SchedulingProject {
  projectId?: number;
  event: number;
  projectTitle: string;
  maxTimePerStaff: number;
}

export class CreateSchedulingProject {
  name: string;
  maxHoursPerStaff: number;
  copyOf?: number;
  copySlots?: boolean;
  copyConstraints?: boolean;
}
