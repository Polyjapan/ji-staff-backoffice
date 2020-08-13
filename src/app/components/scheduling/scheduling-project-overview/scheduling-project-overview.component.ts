import {Component, OnInit} from '@angular/core';
import {SchedulingService} from '../../../services/scheduling.service';
import {ActivatedRoute} from '@angular/router';
import {SchedulingTask} from '../../../data/scheduling/schedulingTask';
import Swal from 'sweetalert2';
import {SchedulingProject} from '../../../data/scheduling/schedulingProject';
import {displayPeriod} from '../../../data/scheduling/period';

@Component({
  selector: 'app-scheduling-project-overview',
  templateUrl: './scheduling-project-overview.component.html',
  styleUrls: ['./scheduling-project-overview.component.css']
})
export class SchedulingProjectOverviewComponent implements OnInit {
  project: number;
  tasks: SchedulingTask[];
  projectData: SchedulingProject;

  constructor(private backend: SchedulingService, private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.ar.paramMap.subscribe(map => {
      this.project = Number.parseInt(map.get('project'), 10);
    });
    this.backend.getTasks(this.project).subscribe(data => this.tasks = data.sort((a, b) => a.name.localeCompare(b.name)));
    this.backend.getProject(this.project).subscribe(data => this.projectData = data);
  }

}
