import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Event} from '../data/event';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseApiUrl = environment.apiurl + '/back';

  constructor(private http: HttpClient) {
  }

  getEditions(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseApiUrl + '/editions');
  }

  getEdition(id: number): Observable<Event> {
    return this.http.get<Event>(this.baseApiUrl + '/editions/' + id);
  }

  createEdition(edition: Event, copyOf?: number): Observable<number> {
    // TODO: better check the date, or the server will do it for us
    return this.http.post<number>(this.baseApiUrl + '/editions', {
      copyOf,
      name: edition.name,
      date: (typeof edition.eventBegin === 'string') ?
        edition.eventBegin :
        (edition.eventBegin.getFullYear() + '-' + edition.eventBegin.getMonth() + '-' + edition.eventBegin.getDate())
    });
  }
}


