import {Component, OnInit} from '@angular/core';
import {SchedulingService} from '../../../services/scheduling.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ScheduleVersion} from '../../../data/scheduling/version';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {displayPeriod} from '../../../data/scheduling/period';

@Component({
  selector: 'app-scheduling-versions',
  templateUrl: './scheduling-versions.component.html',
  styleUrls: ['./scheduling-versions.component.css']
})
export class SchedulingVersionsComponent implements OnInit {
  projectId: number;
  $versions: Observable<ScheduleVersion[]>;
  generatingSchedule = false;

  constructor(private service: SchedulingService,
              private ar: ActivatedRoute) {
  }


  regenSchedule() {
    if (this.generatingSchedule) {
      return;
    }


    this.generatingSchedule = true;

    this.service.generateSchedule(this.projectId)
      .subscribe(res => {
        if (res.averageHoursPerStaff < 0.1) {
          Swal.fire('Wow...', 'Impossible de trouver un planning avec ces paramètres.', 'error');
        } else if (res.notFullSlots.length === 0) {
          Swal.fire('Planning généré', 'Bravo :o Le planning a bien été généré. Espérons qu\'il soit bien !', 'success');
        } else {
          const data = res.notFullSlots.map(slot => '<li>' + slot.task.name + ' ' + displayPeriod(slot.timeSlot) + '</li>').join('\n');
          Swal.fire({
            title: 'Planning partiel généré',
            html: `Le planning a été généré, mais certains shifts sont vides...<br>
                <ul>` + data + `</ul>
            `, icon: 'warning'
          });
        }

        this.generatingSchedule = false;
        this.reload();
      });
  }

  ngOnInit() {
    this.ar.paramMap.subscribe(params => {
      this.projectId = Number.parseInt(params.get('project'), 10);
      this.reload();
    });
  }

  reload() {
    this.$versions = this.service.getVersions(this.projectId).pipe(map(elts => elts.map(elt => {
      elt.generationTime = new Date(elt.generationTime as any as number);
      return elt;
    })));
  }

  scheduleUrl(element?: ScheduleVersion) {
    return this.service.getScheduleUrl(this.projectId, element?.id);
  }

  scheduleByTaskUrl(element: ScheduleVersion) {
    return this.service.getScheduleByTaskUrl(this.projectId, element?.id);
  }

  setDefault(element: ScheduleVersion) {
    Swal.fire({
      title: 'Êtes vous certain.e ?',
      text: 'Voulez vous vraiment remplacer le planning affiché ? Les liens que vous avez distribués redirigeront vers ce nouveau planning - cela peut être perturbant s\'il y a beaucoup de changements.',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(alertResult => {
      if (alertResult.value && alertResult.isConfirmed) {
        this.service.setActiveVersion(this.projectId, element.id).subscribe(res => this.reload());
      }
    });
  }

  setTag(element: ScheduleVersion) {
    Swal.fire({
      title: 'Indiquer le tag souhaité',
      input: 'text',
      showConfirmButton: true,
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this.service.setTag(this.projectId, element.id, result.value as string).subscribe(res => element.tag = result.value as string);
      }
    });
  }
}
