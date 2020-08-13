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
import {CreateConstraintTypeComponent} from './components/scheduling/scheduling-constraints/create-constraint-type.component';
import { CreateConstraintComponent } from './components/scheduling/scheduling-constraints/create-constraint/create-constraint.component';
import { StaffsInputLevelsComponent } from './components/events/staffs-input-levels/staffs-input-levels.component';
import { StaffInputCapabilitiesComponent } from './components/events/staff-input-capabilities/staff-input-capabilities.component';
import {CreateTaskTypeComponent} from './components/scheduling/select-task-type/create-task-type/create-task-type.component';
import {SelectTaskTypeComponent} from './components/scheduling/select-task-type/select-task-type.component';
import { StaffArrivalDepartureComponent } from './components/arrival-departure/staff-arrival-departure/staff-arrival-departure.component';
import {StaffsDepartureComponent} from './components/arrival-departure/staffs-departure.component';
import {StaffsArrivalComponent} from './components/arrival-departure/staffs-arrival.component';
import { MealsDealerComponent } from './components/food/meals-dealer/meals-dealer.component';
import { MealsSelectorComponent } from './components/food/meals-selector/meals-selector.component';
import { SelectFormFieldComponent } from './components/forms/select-form-field/select-form-field.component';
import { SchedulingVersionsComponent } from './components/scheduling/scheduling-versions/scheduling-versions.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSortModule} from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    SchedulingConstraintsComponent,
    CreateConstraintTypeComponent,
    CreateConstraintComponent,
    StaffsInputLevelsComponent,
    StaffInputCapabilitiesComponent,
    CreateTaskTypeComponent,
    SelectTaskTypeComponent,
    StaffArrivalDepartureComponent,
    StaffsDepartureComponent,
    StaffsArrivalComponent,
    MealsDealerComponent,
    MealsSelectorComponent,
    SelectFormFieldComponent,
    SchedulingVersionsComponent,
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
    MatStepperModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
