import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../services/backend.service';
import Swal from 'sweetalert2';
import {SchedulingService} from '../../../services/scheduling.service';

@Component({
  selector: 'app-staff-input-capabilities',
  templateUrl: './staff-input-capabilities.component.html',
  styleUrls: ['./staff-input-capabilities.component.css']
})
export class StaffInputCapabilitiesComponent implements OnInit {
  caps: string[];
  capsMap = new Map<string, number>();
  sending = false;
  input: string;
  evId: number;

  constructor(private ar: ActivatedRoute, private back: BackendService, private sched: SchedulingService, private router: Router) {
  }

  ngOnInit() {
    this.ar.data
      .subscribe(ev => {
        this.evId = ev.eventId;
      });

    this.sched.getCapabilities().subscribe(caps => {
      this.caps = caps.map(c => c.cap);
      caps.forEach(cap => this.capsMap.set(cap.cap.toLowerCase(), cap.id));
    });
  }

  send() {
    if (this.sending || !this.input) {
      return;
    }
    this.sending = true;

    // Parse text
    const lines = this.input.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const notFound = [];
    const parsed = lines
      .map(line => line.split(',').map((col, index) => {
        if (index === 0) {
          return Number.parseInt(col.trim(), 10);
        }

        const tag = col.trim().toLowerCase();

        if (!this.capsMap.has(tag)) {
          notFound.push(col.trim());
          return NaN;
        } else {
          return this.capsMap.get(tag);
        }
      }));

    if (!parsed.every(line => !isNaN(line[0]))) {
      // Error
      const firstBad = parsed.findIndex(line => line.every(num => !isNaN(num)));
      Swal.fire('Format incorrect', 'Un numéro de staff est incorrect sur la ligne suivante : ' + lines[firstBad], 'error');
      this.sending = false;
      return;
    }

    if (notFound.length > 0) {
      // Error
      Swal.fire('Format incorrect', 'Les capacités suivantes n\'existent pas : ' + notFound.join(', '), 'error');
      this.sending = false;
      return;
    }

    this.back.addStaffCapabilities(this.evId, parsed).subscribe(res => {
      Swal.fire('OK', 'Les capacités de staffs ont bien été définies !', 'success');
      this.router.navigate(['..'], {relativeTo: this.ar});
    }, err => {
      this.sending = false;
      Swal.fire('Oups', 'Une erreur s\'est produite.', 'error');
    });
  }

}
