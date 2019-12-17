import {SchedulingProject} from './schedulingProject';

export class Task {
  id: number;
  project?: SchedulingProject;
  name: string;
  minAge: number;
  minExperience: number;
  difficulties: string[];
}

export class CreateUpdateTask {
  name: string;
  minAge: string;
  minExperience: string;
  difficulties: number[];
}
