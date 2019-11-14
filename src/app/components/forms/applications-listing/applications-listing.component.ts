import {Component, Input, OnInit} from '@angular/core';
import {ApplicationState, ApplicationStates, readableState} from '../../../data/state';
import {BackendService} from '../../../services/backend.service';
import {ApplicationListing} from '../../../data/applications';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

class Listing {

  state: ApplicationState;
  applicationId: number;
  name: string;
  email: string;

  constructor(l: ApplicationListing) {
    this.state = l.state;
    this.applicationId = l.applicationId;
    this.email = l.user.email;
    this.name = l.user.firstName + ' ' + l.user.lastName;
  }

}

class CustomDataSource extends MatTableDataSource<Listing> {
  private readonly _state = new BehaviorSubject<ApplicationState>(undefined);

  get state() {
    return this._state ? this._state.value : undefined;
  }

  set state(state: ApplicationState) {
    this._state.next(state);
    this.filter = this.filter; // artificial push to force recomputation
  }

  _filterData(data: Listing[]) {
    // If there is a filter string, filter out data that does not contain it.
    // Each data object is converted to a string using the function defined by filterTermAccessor.
    // May be overridden for customization.
    this.filteredData =
      (this.filter || this.state) ? data.filter(obj =>
        (this.state ? this.state === obj.state : true) && (this.filter ? this.filterPredicate(obj, this.filter) : true)
      ) : data;

    if (this.paginator) { this._updatePaginator(this.filteredData.length); }

    return this.filteredData;
  }
}

@Component({
  selector: 'app-applications-listing',
  templateUrl: './applications-listing.component.html',
  styleUrls: ['./applications-listing.component.css']
})
export class ApplicationsListingComponent implements OnInit {
  @Input() state: ApplicationState;
  @Input() form: number;
  applications: CustomDataSource;
  ApplicationState = ApplicationState;
  ApplicationStates = ApplicationStates;
  readable = readableState;

  constructor(private backend: BackendService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.backend.getApplications(this.form, this.state).subscribe(a =>
      this.applications = new CustomDataSource(a.map(l => new Listing(l))));
  }

  filteredByState(state: ApplicationState) {
    this.applications.state = state;
  }

  filteredByValue(filterValue: string) {
    this.applications.filter = filterValue.trim().toLowerCase();
  }

  standardPredicate(data: ApplicationListing, filter: string) {
    for (const field in data) {
      if ((data[field] as string).toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
    }

    return false;
  }

  open(applicationId: number) {
    this.router.navigate(['applications', applicationId], {relativeTo: this.route.parent});
  }
}
