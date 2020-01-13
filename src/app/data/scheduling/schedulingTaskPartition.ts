import {Period} from './period';

export class SchedulingTaskPartition {
  taskPartitionId?: number;
  task: number;
  staffsRequired: number;
  shiftDuration: number; // in minutes
  slot: Period;
  alternateShifts: boolean;
  alternateOffset?: number;
  firstAlternatedShift: PartitionRule = PartitionRule.SHORTER;
  lastAlternatedShift: PartitionRule = PartitionRule.LONGER;
  lastNormalShift: PartitionRule = PartitionRule.SHORTER;
}

export enum PartitionRule {
  LONGER = 'longer', SHORTER = 'shorter', REMOVED = 'removed'
}

export function partitionRuleToString(part: PartitionRule) {
  switch (part) {
    case PartitionRule.LONGER:
      return 'Rendre le shift plus long';
    case PartitionRule.SHORTER:
      return 'Rendre le shift plus court';
    case PartitionRule.REMOVED:
      return 'Supprimer le shift';
  }
}
