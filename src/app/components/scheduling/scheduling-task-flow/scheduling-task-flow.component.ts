import { Component, OnInit } from '@angular/core';
import {SchedulingTask} from '../../../data/scheduling/schedulingTask';
import {ActivatedRoute, Router} from '@angular/router';
import {SchedulingService} from '../../../services/scheduling.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scheduling-task-flow',
  templateUrl: './scheduling-task-flow.component.html',
  styleUrls: ['./scheduling-task-flow.component.css']
})
export class SchedulingTaskFlowComponent implements OnInit {
  projectId: number;
  taskId: number;
  loading = true;

  task = new SchedulingTask();

  copying = false;
  deleting = false;

  constructor(private ar: ActivatedRoute, private backend: SchedulingService, private router: Router) {
    this.task.projectId = 1;

  }

  ngOnInit() {
    this.ar.paramMap.subscribe(map => {
      this.projectId = Number.parseInt(map.get('project'), 10);

      if (map.has('task')) {
        this.taskId = Number.parseInt(map.get('task'), 10);
        this.backend.getTask(this.projectId, this.taskId)
          .subscribe(task => {
            this.task = task;
            this.loading = false;
          });
      } else {
        this.task = new SchedulingTask();
        this.task.projectId = this.projectId;
        this.loading = false;
      }
    });
  }

  copy() {
    if (this.copying) {
      return;
    }

    this.copying = true;
    this.backend.duplicateTask(this.projectId, this.taskId).subscribe(taskId => {
      this.router.navigate(['..', taskId], {relativeTo: this.ar});
      this.copying = false;
      Swal.fire('Poste copié !', 'Le poste a bien été copié. Vous êtes désormais en train de modifier la copie.', 'success')
    }, err => {
      Swal.fire('Erreur', 'Une errer s\'est produite en copiant ce poste.', 'error');
      this.copying = false;
    });
  }

  delete() {
    if (this.deleting) {
      return;
    }

    this.deleting = true;
    this.backend.deleteTask(this.projectId, this.taskId).subscribe(a => {
      Swal.fire('Poste supprimé !', 'Le poste a bien été supprimé.', 'success')
      this.router.navigate(['../..'], {relativeTo: this.ar});
    }, err => {
      Swal.fire('Erreur', 'Une errer s\'est produite en supprimant ce poste.', 'error');
      this.deleting = false;
    });
  }
}
