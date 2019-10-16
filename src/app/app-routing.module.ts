import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFailedComponent} from './components/login-failed/login-failed.component';
import {RequireLoginComponent} from './components/require-login/require-login.component';
import {PermissionAuthGuard} from './services/permission-auth-guard.service';
import {LoggedinComponent} from './components/loggedin.component';
import {PickEditionComponent} from './components/pick-edition/pick-edition.component';
import {EventParentComponent} from './components/event-parent/event-parent.component';
import {EventHomeComponent} from './components/event-home/event-home.component';
import {EventFormsComponent} from './components/event-forms/event-forms.component';
import {FormPageEditComponent} from './components/form-page-edit/form-page-edit.component';
import {ApplicationComponent} from './components/application/application.component';
import {FormApplicationsListingComponent} from './components/form-applications-listing/form-applications-listing.component';
import {StaffsListingComponent} from './components/staffs-listing/staffs-listing.component';


const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'event/:id', component: EventParentComponent, children: [
          {path: '', pathMatch: 'full', component: EventHomeComponent},
          {path: 'forms', component: EventFormsComponent},
          {path: 'forms/:formId/pages/:pageId', component: FormPageEditComponent},
          {path: 'forms/:formId/applications', component: FormApplicationsListingComponent},
          {path: 'applications/:id', component: ApplicationComponent},
          {path: 'staffs', component: StaffsListingComponent},
        ]
      },
      {path: '', pathMatch: 'full', component: PickEditionComponent},
    ],
    canActivate: [PermissionAuthGuard],
    component: LoggedinComponent
  },
  {path: 'require-login', component: RequireLoginComponent},
  {path: 'login-failed', component: LoginFailedComponent},
  {
    path: '**',
    canActivate: [PermissionAuthGuard],
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

