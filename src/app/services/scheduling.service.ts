import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Event} from '../data/event';
import {CreateSchedulingProject, SchedulingProject} from '../data/scheduling/schedulingProject';
import {map} from 'rxjs/operators';
import {CreateUpdateTask, SchedulingTask} from '../data/scheduling/schedulingTask';
import {SchedulingTaskPartition} from '../data/scheduling/schedulingTaskPartition';
import {TaskSlot} from '../data/scheduling/taskSlot';
import {Period} from '../data/scheduling/period';
import {SchedulingResult} from '../data/scheduling/schedulingResult';
import {FixedTaskConstraint, ScheduleConstraint, UnavailableConstraint} from '../data/scheduling/constraints';
import {Capability} from '../data/scheduling/capability';

type SchedulingMap = [Event, SchedulingProject[]][];

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  private BASE = environment.apiurl + '/scheduling';

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Map<Event, SchedulingProject[]>> {
    return this.http.get<SchedulingMap>(this.BASE + '/projects').pipe(map(sched => {
      const retMap = new Map<Event, SchedulingProject[]>();

      sched.forEach(evdata => retMap.set(evdata[0], evdata[1]));

      return retMap;
    }));
  }

  getProject(project: number): Observable<SchedulingProject> {
      return this.http.get<SchedulingProject>(this.BASE + '/projects/' + project);
  }

  createProject(event: number, data: CreateSchedulingProject): Observable<number> {
    return this.http.post<number>(this.BASE + '/' + event + '/projects', data);
  }

  getTask(project: number, task: number): Observable<SchedulingTask> {
    return this.http.get<SchedulingTask>(this.BASE + '/projects/' + project + '/tasks/' + task);
  }

  getTasks(project: number): Observable<SchedulingTask[]> {
    return this.http.get<SchedulingTask[]>(this.BASE + '/projects/' + project + '/tasks');
  }

  createTask(project: number, data: CreateUpdateTask): Observable<number> {
    return this.http.post<number>(this.BASE + '/projects/' + project + '/tasks', data);
  }

  duplicateTask(project: number, taskId: number): Observable<number> {
    return this.http.post<number>(this.BASE + '/projects/' + project + '/tasks/copy', taskId);
  }

  deleteTask(project: number, taskId: number): Observable<void> {
    return this.http.delete<void>(this.BASE + '/projects/' + project + '/tasks/' + taskId, {
      headers: {
        'Content-Type': 'application/json'
      }});
  }

  updateTask(project: number, task: number, data: CreateUpdateTask): Observable<void> {
    return this.http.put<void>(this.BASE + '/projects/' + project + '/tasks/' + task, data);
  }

  private fixSlot(p: Period) {
    if (typeof(p.day) === 'string') {
      return;
    }
    const dateSlot = ((p.day) as unknown as Date);
    // cancel tz effect
    dateSlot.setTime(dateSlot.getTime() - dateSlot.getTimezoneOffset() * 60 * 1000);
    p.day = dateSlot.toISOString();
  }

  createTaskPartition(project: number, data: SchedulingTaskPartition): Observable<number> {
    this.fixSlot(data.slot);
    return this.http.post<number>(this.BASE + '/projects/' + project + '/tasks/' + data.task + '/partitions', data);
  }

  updateTaskPartition(project: number, data: SchedulingTaskPartition): Observable<void> {
    this.fixSlot(data.slot);
    return this.http.put<void>(this.BASE + '/projects/' + project + '/tasks/' + data.task + '/partitions/' + data.taskPartitionId, data);
  }

  getTaskPartitions(project: number, task: number): Observable<SchedulingTaskPartition[]> {
    return this.http.get<SchedulingTaskPartition[]>(this.BASE + '/projects/' + project + '/tasks/' + task + '/partitions');
  }

  deleteTaskPartition(project: number, task: number, partition: number): Observable<void> {
    return this.http.delete<void>(this.BASE + '/projects/' + project + '/tasks/' + task + '/partitions/' + partition);
  }

  getTaskSlots(project: number, task: number): Observable<TaskSlot[]> {
    return this.http.get<TaskSlot[]>(this.BASE + '/projects/' + project + '/tasks/' + task + '/slots');
  }

  generateTaskSlots(project: number, task: number): Observable<void> {
    return this.http.post<void>(this.BASE + '/projects/' + project + '/tasks/' + task + '/slots/generate', {});
  }

  generateSchedule(project: number): Observable<SchedulingResult> {
    return this.http.post<SchedulingResult>(this.BASE + '/projects/' + project + '/schedule/generate', {});
  }

  getConstraints(project: number): Observable<ScheduleConstraint[]> {
    return this.http.get<ScheduleConstraint[]>(this.BASE + '/projects/' + project + '/constraints');
  }

  createConstraint(project: number, data: ScheduleConstraint): Observable<number> {
    if (data.constraint instanceof UnavailableConstraint || (data.constraint instanceof FixedTaskConstraint && (data.constraint as FixedTaskConstraint).period)) {
      this.fixSlot(((data.constraint) as UnavailableConstraint | FixedTaskConstraint).period);
    }
    data.constraint.projectId = project;
    return this.http.post<number>(this.BASE + '/projects/' + project + '/constraints', data);
  }

  deleteConstraint(project: number, data: ScheduleConstraint): Observable<number> {
    return this.http.post<number>(this.BASE + '/projects/' + project + '/constraints/delete', data);
  }

  getScheduleUrl(project: number) {
    return this.BASE + '/projects/' + project + '/schedule/byStaff.html';
  }

  getScheduleByTaskUrl(project: number) {
    return this.BASE + '/projects/' + project + '/schedule/byTask.html';
  }

  createCapability(cap: string): Observable<number> {
    return this.http.post<number>(this.BASE + '/capabilities', cap);
  }

  getCapabilities(): Observable<Capability[]> {
    return this.http.get<Capability[]>(this.BASE + '/capabilities');
  }

}


