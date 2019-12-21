import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFailedComponent} from './components/accounts/login-failed/login-failed.component';
import {RequireLoginComponent} from './components/accounts/require-login/require-login.component';
import {PermissionAuthGuard} from './services/permission-auth-guard.service';
import {LoggedinComponent} from './components/loggedin.component';
import {PickEditionComponent} from './components/events/pick-edition/pick-edition.component';
import {EventParentComponent} from './components/events/event-parent/event-parent.component';
import {EventHomeComponent} from './components/events/event-home/event-home.component';
import {EventFormsComponent} from './components/events/event-forms/event-forms.component';
import {FormPageEditComponent} from './components/forms/form-page-edit/form-page-edit.component';
import {ApplicationComponent} from './components/forms/application/application.component';
import {FormApplicationsListingComponent} from './components/forms/form-applications-listing/form-applications-listing.component';
import {StaffsListingComponent} from './components/events/staffs-listing/staffs-listing.component';
import {SchedulingProjectsComponent} from './components/scheduling/scheduling-projects/scheduling-projects.component';
import {SchedulingProjectOverviewComponent} from './components/scheduling/scheduling-project-overview/scheduling-project-overview.component';
import {SchedulingTaskFlowComponent} from './components/scheduling/scheduling-task-flow/scheduling-task-flow.component';
import {SchedulingConstraintsComponent} from './components/scheduling/scheduling-constraints/scheduling-constraints.component';


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
          {path: 'scheduling', component: SchedulingProjectsComponent},
          {path: 'scheduling/:project', component: SchedulingProjectOverviewComponent}, // likely temporary
          {path: 'scheduling/:project/constraints', component: SchedulingConstraintsComponent}, // likely temporary
          {path: 'scheduling/:project/task/create', component: SchedulingTaskFlowComponent}, // temporary
          {path: 'scheduling/:project/task/:task', component: SchedulingTaskFlowComponent}, // temporary
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

