import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginFailedComponent} from './components/login-failed/login-failed.component';
import {RequireLoginComponent} from './components/require-login/require-login.component';
import {PermissionAuthGuard} from './services/permission-auth-guard.service';
import {LoggedinComponent} from './components/loggedin.component';
import {PickEditionComponent} from './components/pick-edition/pick-edition.component';
import {EventParentComponent} from './components/event-parent/event-parent.component';
import {EventParamsComponent} from './components/event-params/event-params.component';
import {EventFormsComponent} from './components/event-forms/event-forms.component';
import {FormPageEditComponent} from './components/form-page-edit/form-page-edit.component';


const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'event/:id', component: EventParentComponent, children: [
          {path: '', pathMatch: 'full', component: EventParamsComponent},
          {path: 'forms', component: EventFormsComponent},
          {path: 'forms/:formId/pages/:pageId', component: FormPageEditComponent},
        ]
      },
      {path: '', pathMatch: 'full', component: PickEditionComponent},
    ],
    canActivate: [PermissionAuthGuard],
    component: LoggedinComponent
  },
  {path: 'require-login', component: RequireLoginComponent},
  {path: 'login-failed', component: LoginFailedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

