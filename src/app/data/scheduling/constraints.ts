import {Period} from './period';

export class ScheduleConstraint {
  constraintType: string;
  constraint: AbstractConstraint;
}

export class AbstractConstraint {
  constraintId?: number;
  projectId: number;
}

export class BannedTaskConstraint extends AbstractConstraint {
  staffId: number;
  taskId: number;
}

export class FixedTaskSlotConstraint extends AbstractConstraint {
  staffId: number;
  slotId: number;
}

export class UnavailableConstraint extends AbstractConstraint {
  staffId: number;
  period: Period;
}

export class AssociationConstraint extends AbstractConstraint {
  staff1: number;
  staff2: number;
  together: boolean;
}


