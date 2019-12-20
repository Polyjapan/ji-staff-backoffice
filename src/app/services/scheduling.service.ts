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


  createProject(event: number, data: CreateSchedulingProject): Observable<number> {
    return this.http.post<number>(this.BASE + '/' + event + '/projects', data);
  }

  getTask(project: number, task: number): Observable<SchedulingTask> {
    return this.http.get<SchedulingTask>(this.BASE + '/projects/' + project + '/tasks/' + task);
  }

  createTask(project: number, data: CreateUpdateTask): Observable<number> {
    return this.http.post<number>(this.BASE + '/projects/' + project + '/tasks', data);
  }

  updateTask(project: number, task: number, data: CreateUpdateTask): Observable<void> {
    return this.http.put<void>(this.BASE + '/projects/' + project + '/tasks/' + task, data);
  }

  createTaskPartition(project: number, data: SchedulingTaskPartition): Observable<number> {
    return this.http.post<number>(this.BASE + '/projects/' + project + '/tasks/' + data.task + '/partitions', data);
  }

  updateTaskPartition(project: number, data: SchedulingTaskPartition): Observable<void> {
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

}

