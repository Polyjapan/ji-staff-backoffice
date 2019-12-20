import {SchedulingProject} from './schedulingProject';

export class SchedulingTask {
  id?: number;
  projectId: number;
  name: string;
  minAge: number;
  minExperience: number;
  difficulties: string[];
}

export class CreateUpdateTask {
  name: string;
  minAge: number;
  minExperience: number;
  difficulties: number[];
}
