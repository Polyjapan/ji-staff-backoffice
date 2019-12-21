import { Component, OnInit } from '@angular/core';
import {SchedulingService} from '../../../services/scheduling.service';
import {ActivatedRoute} from '@angular/router';
import {SchedulingTask} from '../../../data/scheduling/schedulingTask';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scheduling-project-overview',
  templateUrl: './scheduling-project-overview.component.html',
  styleUrls: ['./scheduling-project-overview.component.css']
})
export class SchedulingProjectOverviewComponent implements OnInit {
  project: number;
  tasks: SchedulingTask[];
  generatingSchedule = false;

  constructor(private backend: SchedulingService, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.ar.paramMap.subscribe(map => {
      this.project = Number.parseInt(map.get('project'), 10);
    });
    this.backend.getTasks(this.project).subscribe(data => this.tasks = data);
  }

  regenSchedule() {
    if (this.generatingSchedule) {
      return;
    }

    Swal.fire({
        title: 'Veux tu vraiment faire ça ?',
        text: 'Attention, si un planning a déjà été généré il sera effacé!',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true

      }).then(alertResult => {
        if (alertResult.value && !this.generatingSchedule) {
          this.generatingSchedule = true;

          this.backend.generateSchedule(this.project)
            .subscribe(res => {
              Swal.fire('Planning généré', 'Bravo :o Le planning a bien été généré. Espérons qu\'il soit bien !', 'success');

              this.generatingSchedule = false;
            });

        }
    });

  }
}
