import {Component, Input, OnInit} from '@angular/core';
import {ApplicationState, ApplicationStates, readableState} from '../../data/state';
import {BackendService} from '../../services/backend.service';
import {ApplicationListing} from '../../data/applications';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-applications-listing',
  templateUrl: './applications-listing.component.html',
  styleUrls: ['./applications-listing.component.css']
})
export class ApplicationsListingComponent implements OnInit {
  @Input() state: ApplicationState;
  @Input() form: number;
  applications: MatTableDataSource<ApplicationListing>;
  ApplicationStates = ApplicationStates;
  readable = readableState;

  constructor(private backend: BackendService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.backend.getApplications(this.form, this.state).subscribe(a => this.applications = new MatTableDataSource<ApplicationListing>(a));
  }

  filteredByState(state: ApplicationState) {
    this.applications.filterPredicate = ((app, filter) => app.state === state && (!filter || this.standardPredicate(app, filter)));
  }

  filteredByValue(filterValue: string) {
    this.applications.filter = filterValue;
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
    this.router.navigate(['applications', applicationId], { relativeTo: this.route });
  }
}
