import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../services/backend.service';
import {StaffListEntry} from '../../../data/staffs';
import {MatTableDataSource} from '@angular/material/table';
import * as FileSaver from 'file-saver';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-staffs-listing',
  templateUrl: './staffs-listing.component.html',
  styleUrls: ['./staffs-listing.component.css']
})
export class StaffsListingComponent implements OnInit {
  evId: number;
  staffs: MatTableDataSource<StaffListEntry>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ar: ActivatedRoute, private backend: BackendService, private router: Router) {
  }

  ngOnInit() {
    this.ar.data
      .subscribe(ev => {
        this.evId = ev.eventId;
        this.refresh();
      });
  }

  openApplication(applicationId: number) {
    this.router.navigate(['applications', applicationId], {relativeTo: this.ar.parent});
  }

  downloadList() {
    this.backend.exportStaffs(this.evId).subscribe(blob => {
      if (blob) {
        FileSaver.saveAs(blob, 'staffs-' + this.evId + '.csv');
      }
    });
  }

  openHistory(staff: number) {
    alert('Fonctionalité indisponible.');
    // this.router.navigate(['applications', applicationId]);
  }

  private refresh() {
    this.backend.getStaffs(this.evId).subscribe(staffs => {
      this.staffs = new MatTableDataSource<StaffListEntry>(staffs);
      this.staffs.sort = this.sort;
    });
  }
}
