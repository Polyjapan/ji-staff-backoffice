import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Event} from '../data/event';
import {SchedulingProject} from '../data/scheduling/schedulingProject';
import {map} from 'rxjs/operators';

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
}


