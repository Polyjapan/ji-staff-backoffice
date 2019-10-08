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
  MatBottomSheetModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatInputModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSlideToggleModule, MatTabsModule
} from '@angular/material';
import {LoggedinComponent} from './components/loggedin.component';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthModule, tokenGetter} from './services/auth.module';
import {LoginService} from './services/login.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PickEditionComponent} from './components/pick-edition/pick-edition.component';
import {environment} from '../environments/environment';
import {EventCreateComponent} from './components/event-create/event-create.component';
import {CreateOrCopyComponent} from './components/pick-edition/create-or-copy.component';
import {PickCopyComponent} from './components/pick-edition/pick-copy.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestComponent} from './components/test.component';
import {EventParentComponent} from './components/event-parent/event-parent.component';
import {EventHomeComponent} from './components/event-home/event-home.component';
import {EventFormsComponent} from './components/event-forms/event-forms.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {FormCreateComponent} from './components/form-create/form-create.component';
import { FormPageCreateComponent } from './components/form-page-create/form-page-create.component';
import {FormPage} from './data/formpage';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormPageEditComponent } from './components/form-page-edit/form-page-edit.component';
import { SetAdditionalFormComponent } from './components/set-additional-form/set-additional-form.component';
import { ApplicationsListingComponent } from './components/applications-listing/applications-listing.component';
import {MatTableModule} from '@angular/material/table';
import { ApplicationComponent } from './components/application/application.component';

@NgModule({
  declarations: [
    AppComponent,
    RequireLoginComponent,
    LoginFailedComponent,
    LoggedinComponent,
    PickEditionComponent,
    EventCreateComponent,
    CreateOrCopyComponent,
    PickCopyComponent,
    TestComponent,
    EventParentComponent,
    EventHomeComponent,
    EventFormsComponent,
    FormCreateComponent,
    FormPageCreateComponent,
    FormPageEditComponent,
    SetAdditionalFormComponent,
    ApplicationsListingComponent,
    ApplicationComponent
  ],
  entryComponents: [
    CreateOrCopyComponent,
    EventCreateComponent,
    PickCopyComponent,
    FormCreateComponent,
    FormPageCreateComponent
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
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    DragDropModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
