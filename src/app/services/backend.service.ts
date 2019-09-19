import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Event} from '../data/event';
import {Form} from '../data/form';
import {FormPage} from '../data/formpage';
import {PageResult} from '../data/pageresult';
import {FormField} from '../data/formfield';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseApiUrl = environment.apiurl + '/back';
  private baseFrontUrl = environment.apiurl + '/front';

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

  setDefaultForm(eventId: number, formId: number): Observable<void> {
    return this.http.put<void>(this.baseApiUrl + '/editions/' + eventId + '/mainForm', formId);
  }

  getForms(event: number): Observable<Form[]> {
    return this.http.get<Form[]>(this.baseApiUrl + '/editions/' + event + '/forms');
  }

  getForm(formId: number): Observable<Form[]> {
    return this.http.get<Form[]>(this.baseFrontUrl + '/forms/' + formId);
  }

  createForm(form: Form): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/forms', form);
  }

  updateForm(form: Form): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/forms/' + form.formId, form);
  }

  getPages(form: number): Observable<FormPage[]> {
    return this.http.get<FormPage[]>(this.baseFrontUrl + '/forms/' + form + '/pages');
  }

  getPage(form: number, page: number): Observable<PageResult> {
    return this.http.get<PageResult>(this.baseFrontUrl + '/forms/' + form + '/pages/' + page);
  }

  createPage(form: number, page: FormPage): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/forms/' + form + '/pages', page);
  }

  updatePage(form: number, page: FormPage): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/forms/' + form + '/pages/' + page.pageId, page);
  }

  createField(form: number, page: number, field: FormField): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/forms/' + form + '/pages/' + page + '/fields', field);
  }

  updateField(form: number, page: number, field: FormField): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/forms/' + form + '/pages/' + page + '/fields/' + field.fieldId, field);
  }

  setAdditional(form: number, page: number, field: number, key: string, value: string): Observable<void> {
    return this.http.put<void>(this.baseApiUrl + '/forms/' + form + '/pages/' + page + '/fields/' + field + '/' + key, value);
  }

  deleteAdditional(form: number, page: number, field: number, key: string): Observable<void> {
    return this.http.delete<void>(this.baseApiUrl + '/forms/' + form + '/pages/' + page + '/fields/' + field + '/' + key);
  }
}


