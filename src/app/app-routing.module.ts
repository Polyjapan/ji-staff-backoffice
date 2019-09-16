import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFailedComponent} from './components/login-failed/login-failed.component';
import {RequireLoginComponent} from './components/require-login/require-login.component';
import {PermissionAuthGuard} from './services/permission-auth-guard.service';
import {LoggedinComponent} from './components/loggedin.component';
import {PickEditionComponent} from './components/pick-edition/pick-edition.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: 'event/:id', pathMatch: 'full', component: PickEditionComponent },
      { path: 'event/create', pathMatch: 'full', component: PickEditionComponent },
      { path: '', pathMatch: 'full', component: PickEditionComponent },
    ],
    canActivate: [PermissionAuthGuard],
    component: LoggedinComponent
  },
  { path: 'require-login', component: RequireLoginComponent },
  { path: 'login-failed', component: LoginFailedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

