import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Event} from '../data/event';
import {Form} from '../data/form';

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

  updateEdition(edition: Event): Observable<void> {
    return this.http.put<void>(this.baseApiUrl + '/editions/' + edition.eventId,
      {name: edition.name, date: edition.eventBegin});
  }

  updateActive(id: number, active: boolean): Observable<void> {
    return this.http.put<void>(this.baseApiUrl + '/editions/' + id + '/active', active);
  }

  getForms(event: number): Observable<Form[]> {
    return this.http.get<Form[]>(this.baseApiUrl + '/editions/' + event + '/forms');
  }

  createForm(form: Form): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/forms', form);
  }

  updateForm(form: Form): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/forms/' + form.formId, form);
  }
}


