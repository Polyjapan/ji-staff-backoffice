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
import {RequireLoginComponent} from './components/accounts/require-login/require-login.component';
import {LoginFailedComponent} from './components/accounts/login-failed/login-failed.component';
import {FlexModule} from '@angular/flex-layout';
import {
  MatBottomSheetModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatInputModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSlideToggleModule, MatSortModule, MatStepperModule, MatTabsModule
} from '@angular/material';
import {LoggedinComponent} from './components/loggedin.component';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthModule, tokenGetter} from './services/auth.module';
import {LoginService} from './services/login.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PickEditionComponent} from './components/events/pick-edition/pick-edition.component';
import {environment} from '../environments/environment';
import {EventCreateComponent} from './components/events/event-create/event-create.component';
import {CreateOrCopyComponent} from './components/events/pick-edition/create-or-copy.component';
import {PickCopyComponent} from './components/events/pick-edition/pick-copy.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestComponent} from './components/test.component';
import {EventParentComponent} from './components/events/event-parent/event-parent.component';
import {EventHomeComponent} from './components/events/event-home/event-home.component';
import {EventFormsComponent} from './components/events/event-forms/event-forms.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {FormCreateComponent} from './components/forms/form-create/form-create.component';
import { FormPageCreateComponent } from './components/forms/form-page-create/form-page-create.component';
import {FormPage} from './data/formpage';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormPageEditComponent } from './components/forms/form-page-edit/form-page-edit.component';
import { SetAdditionalFormComponent } from './components/forms/set-additional-form/set-additional-form.component';
import { ApplicationsListingComponent } from './components/forms/applications-listing/applications-listing.component';
import {MatTableModule} from '@angular/material/table';
import { ApplicationComponent } from './components/forms/application/application.component';
import { FormApplicationsListingComponent } from './components/forms/form-applications-listing/form-applications-listing.component';
import { StaffsListingComponent } from './components/events/staffs-listing/staffs-listing.component';
import { SchedulingProjectsComponent } from './components/scheduling/scheduling-projects/scheduling-projects.component';
import { SchedulingProjectCreateComponent } from './components/scheduling/scheduling-project-create/scheduling-project-create.component';
import {CreateOrCopyProjectComponent} from './components/scheduling/scheduling-projects/create-or-copy.component';
import {PickSchedulingCopyComponent} from './components/scheduling/scheduling-projects/pick-copy.component';
import { SchedulingProjectOverviewComponent } from './components/scheduling/scheduling-project-overview/scheduling-project-overview.component';
import { SchedulingTaskFlowComponent } from './components/scheduling/scheduling-task-flow/scheduling-task-flow.component';
import { SchedulingTaskCreateComponent } from './components/scheduling/scheduling-task-flow/scheduling-task-create/scheduling-task-create.component';
import { SchedulingTaskPartitionsComponent } from './components/scheduling/scheduling-task-flow/scheduling-task-partitions/scheduling-task-partitions.component';
import { SchedulingTaskPartitionEditComponent } from './components/scheduling/scheduling-task-flow/scheduling-task-partition-edit/scheduling-task-partition-edit.component';
import { SchedulingSlotsShowComponent } from './components/scheduling/scheduling-task-flow/scheduling-slots-show/scheduling-slots-show.component';
import { SchedulingConstraintsComponent } from './components/scheduling/scheduling-constraints/scheduling-constraints.component';

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
    ApplicationComponent,
    FormApplicationsListingComponent,
    StaffsListingComponent,
    SchedulingProjectsComponent,
    SchedulingProjectCreateComponent,
    CreateOrCopyProjectComponent,
    PickSchedulingCopyComponent,
    SchedulingProjectOverviewComponent,
    SchedulingTaskFlowComponent,
    SchedulingTaskCreateComponent,
    SchedulingTaskPartitionsComponent,
    SchedulingTaskPartitionEditComponent,
    SchedulingSlotsShowComponent,
    SchedulingConstraintsComponent
  ],
  entryComponents: [
    CreateOrCopyComponent,
    EventCreateComponent,
    PickCopyComponent,
    FormCreateComponent,
    FormPageCreateComponent,
    SchedulingProjectCreateComponent,
    CreateOrCopyProjectComponent,
    PickSchedulingCopyComponent,
    SchedulingTaskPartitionEditComponent
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
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
