import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Event} from '../data/event';
import {Form} from '../data/form';
import {FormPage} from '../data/formpage';
import {PageResult} from '../data/pageresult';
import {FormField} from '../data/formfield';
import {ApplicationState} from '../data/state';
import {ApplicationListing, ApplicationResult, CommentWithAuthor} from '../data/applications';
import {Comment} from '../data/comment';
import {StaffListEntry} from '../data/staffs';
import {UserHistory} from '../data/user';

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

  getEditionStats(id: number): Observable<[ApplicationState, number][]> {
    return this.http.get<[ApplicationState, number][]>(this.baseApiUrl + '/stats/' + id);
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

  getForm(formId: number): Observable<Form> {
    return this.http.get<Form>(this.baseFrontUrl + '/forms/' + formId);
  }

  createForm(form: Form): Observable<number> {
    return this.http.post<number>(this.baseApiUrl + '/forms', form);
  }

  deleteForm(id: number): Observable<void> {
    return this.http.delete<void>(this.baseApiUrl + '/forms/' + id);
  }

  updateForm(form: Form): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/forms/' + form.formId, form);
  }

  getPages(form: number): Observable<FormPage[]> {
    return this.http.get<FormPage[]>(this.baseFrontUrl + '/forms/' + form + '/pages');
  }

  getPage(form: number, page: number): Observable<PageResult> {
    return this.http.get<PageResult>(this.baseApiUrl + '/forms/' + form + '/pages/' + page);
  }

  deletePage(form: number, id: number): Observable<void> {
    return this.http.delete<void>(this.baseApiUrl + '/forms/' + form + '/pages/' + id);
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

  deleteField(form: number, page: number, field: number): Observable<void> {
    return this.http.delete<void>(this.baseApiUrl + '/forms/' + form + '/pages/' + page + '/fields/' + field);
  }

  updateField(form: number, page: number, field: FormField): Observable<number> {
    return this.http.put<number>(this.baseApiUrl + '/forms/' + form + '/pages/' + page + '/fields/' + field.fieldId, field);
  }

  setAdditional(form: number, page: number, field: number, ordering: number, value: string): Observable<void> {
    return this.http.post<void>(this.baseApiUrl + '/forms/' + form + '/pages/' + page + '/fields/' + field + '/setAdditional',
      [value, ordering]);
  }

  deleteAdditional(form: number, page: number, field: number, value: string): Observable<void> {
    return this.http.post<void>(this.baseApiUrl + '/forms/' + form + '/pages/' + page + '/fields/' + field + '/deleteAdditional', value);
  }

  getApplications(form: number, state?: ApplicationState): Observable<ApplicationListing[]> {
    const queryParams = state ? '?state=' + state : '';
    return this.http.get<ApplicationListing[]>(this.baseApiUrl + '/forms/' + form + '/applications' + queryParams);
  }

  getApplication(application: number): Observable<ApplicationResult> {
    return this.http.get<ApplicationResult>(this.baseApiUrl + '/applications/content/' + application);
  }

  getComments(application: number): Observable<CommentWithAuthor[]> {
    return this.http.get<CommentWithAuthor[]>(this.baseApiUrl + '/applications/comments/' + application);
  }

  addComment(application: number, comment: Comment): Observable<void> {
    return this.http.post<void>(this.baseApiUrl + '/applications/comments/' + application, comment);
  }

  setState(application: number, state: ApplicationState): Observable<void> {
    return this.http.put<void>(this.baseApiUrl + '/applications/state/' + application, '"' + state + '"',
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  getStaffs(event: number): Observable<StaffListEntry[]> {
    return this.http.get<StaffListEntry[]>(this.baseApiUrl + '/staffs/' + event);
  }

  exportStaffs(event: number): Observable<Blob> {
    return this.http.get(this.baseApiUrl + '/staffs/' + event + '.csv', {responseType: 'blob'});
  }

  exportForm(form: number): Observable<Blob> {
    return this.http.get(this.baseApiUrl + '/forms/' + form + '/applications.csv', {responseType: 'blob'});
  }

  getUserHistory(user: number): Observable<UserHistory> {
    return this.http.get<UserHistory>(this.baseApiUrl + '/users/' + user);
  }

}


