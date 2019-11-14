import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../services/backend.service';
import {StaffListEntry} from '../../../data/staffs';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-staffs-listing',
  templateUrl: './staffs-listing.component.html',
  styleUrls: ['./staffs-listing.component.css']
})
export class StaffsListingComponent implements OnInit {
  evId: number;
  staffs: MatTableDataSource<StaffListEntry>;

  constructor(private ar: ActivatedRoute, private backend: BackendService, private router: Router) {
  }

  ngOnInit() {
    this.ar.data
      .subscribe(ev => {
        this.evId = ev.eventId;
        this.refresh();
      });
  }

  private refresh() {
    this.backend.getStaffs(this.evId).subscribe(staffs => this.staffs = new MatTableDataSource<StaffListEntry>(staffs));
  }

  openApplication(applicationId: number) {
    this.router.navigate(['applications', applicationId], {relativeTo: this.ar.parent});
  }

  openHistory(staff: number) {
    alert('Fonctionalité indisponible.');
    // this.router.navigate(['applications', applicationId]);
  }
}
