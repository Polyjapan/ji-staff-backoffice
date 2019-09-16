import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {RequireLoginComponent} from './components/require-login/require-login.component';
import {LoginFailedComponent} from './components/login-failed/login-failed.component';
import {FlexModule} from '@angular/flex-layout';
import {
  MatBottomSheetModule,
  MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule, MatNativeDateModule,
  MatProgressBarModule
} from '@angular/material';
import {LoggedinComponent} from './components/loggedin.component';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthModule, tokenGetter} from './services/auth.module';
import {LoginService} from './services/login.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { PickEditionComponent } from './components/pick-edition/pick-edition.component';
import {environment} from '../environments/environment';
import { EventCreateComponent } from './components/event-create/event-create.component';
import {CreateOrCopyComponent} from './components/pick-edition/create-or-copy.component';
import {PickCopyComponent} from './components/pick-edition/pick-copy.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RequireLoginComponent,
    LoginFailedComponent,
    LoggedinComponent,
    PickEditionComponent,
    EventCreateComponent,
    CreateOrCopyComponent,
    PickCopyComponent
  ],
  entryComponents: [
    CreateOrCopyComponent,
    EventCreateComponent,
    PickCopyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    FlexModule,
    AuthModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatNativeDateModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.apidomain]
      }
    }),
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,

  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
