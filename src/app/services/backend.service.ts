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
}


