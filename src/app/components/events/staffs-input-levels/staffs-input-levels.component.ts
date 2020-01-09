import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../services/backend.service';

@Component({
  selector: 'app-staffs-input-levels',
  templateUrl: './staffs-input-levels.component.html',
  styleUrls: ['./staffs-input-levels.component.css']
})
export class StaffsInputLevelsComponent implements OnInit {
  sending = false;
  levels: string;
  evId: number;

  constructor(private ar: ActivatedRoute, private back: BackendService, private router: Router) {
  }

  ngOnInit() {
    this.ar.data
      .subscribe(ev => {
        this.evId = ev.eventId;
      });
  }

  send() {
    if (this.sending || !this.levels) {
      return;
    }
    this.sending = true;

    // Parse text
    const lines = this.levels.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const parsed = lines.map(line => line.split(',').map(col => Number.parseInt(col.trim(), 10)))
      .map(line => [line[0], line[1]]);

    if (!parsed.every(line => line.every(num => !isNaN(num)))) {
      // Error
      const firstBad = parsed.findIndex(line => line.every(num => !isNaN(num)));
      Swal.fire('Format incorrect', 'Certaines lignes ont un format incorrect. Première ligne fausse : ' + lines[firstBad], 'error');
      this.sending = false;
      return;
    }

    this.back.setStaffLevels(this.evId, parsed).subscribe(res => {
      Swal.fire('OK', 'Les niveaux de staffs ont bien été définis !', 'success');
      this.router.navigate(['..'], {relativeTo: this.ar});
    }, err => {
      this.sending = false;
      Swal.fire('Oups', 'Une erreur s\'est produite.', 'error');
    })
  }

}
