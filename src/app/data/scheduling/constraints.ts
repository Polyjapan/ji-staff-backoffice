import {Period} from './period';

export class ScheduleConstraint {
  constraintType: string;
  constraint: AbstractConstraint;
}

export function buildScheduleConstraint(constraint: AbstractConstraint): ScheduleConstraint {
  if (constraint instanceof BannedTaskConstraint) {
    return {constraintType: 'BannedTaskConstraint', constraint};
  } else if (constraint instanceof BannedTaskTypeConstraint) {
    return {constraintType: 'BannedTaskTypeConstraint', constraint};
  } else if (constraint instanceof FixedTaskConstraint) {
    return {constraintType: 'FixedTaskConstraint', constraint};
  } else if (constraint instanceof AssociationConstraint) {
    return {constraintType: 'AssociationConstraint', constraint};
  } else if (constraint instanceof UnavailableConstraint) {
    return {constraintType: 'UnavailableConstraint', constraint};
  } else {
    return undefined;
  }
}

export class AbstractConstraint {
  constraintId?: number;
  projectId?: number;
}

export class BannedTaskConstraint extends AbstractConstraint {
  staffId: number;
  taskId: number;
}

export class BannedTaskTypeConstraint extends AbstractConstraint {
  staffId: number;
  taskTypeId: number;
}

export class FixedTaskConstraint extends AbstractConstraint {
  staffId: number;
  taskId: number;
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


