import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncSubject, BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TaskType} from '../data/scheduling/taskType';
import {map, switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TaskTypesService {
  private BASE = environment.apiurl + '/scheduling';
  private types = new BehaviorSubject<TaskType[]>([]);
  private lastPull = 0;

  constructor(private http: HttpClient) {
  }

  createTaskType(tt: string): Observable<number> {
    return this.http.post<number>(this.BASE + '/taskTypes', tt).pipe(switchMap(v => this.forceRefresh().pipe(map(u => v))));
  }

  forceRefresh(): Observable<void> {
    this.lastPull = 0;
    return this.pullIfNeeded();
  }

  getTaskTypes(): Observable<TaskType[]> {
    this.pullIfNeeded();
    return this.types;
  }

  private pullIfNeeded(): Observable<void> {
    const now = Date.now();
    const update = new AsyncSubject<void>();
    update.next(null);

    if (now - this.lastPull > (60 * 1000)) {
      this.http.get<TaskType[]>(this.BASE + '/taskTypes').subscribe(res => {
        this.types.next(res);
        update.complete();
      });
      this.lastPull = now;
    } else {
      update.complete();
    }

    return update;
  }
}
