import {Component, OnInit} from '@angular/core';
import {Event} from '../../../data/event';
import {SchedulingProject} from '../../../data/scheduling/schedulingProject';
import {SchedulingService} from '../../../services/scheduling.service';
import {ActivatedRoute} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {CreateOrCopyProjectComponent} from './create-or-copy.component';
import {SchedulingProjectCreateComponent} from '../scheduling-project-create/scheduling-project-create.component';
import {BackendService} from '../../../services/backend.service';

@Component({
  selector: 'app-scheduling-projects',
  templateUrl: './scheduling-projects.component.html',
  styleUrls: ['./scheduling-projects.component.css']
})
export class SchedulingProjectsComponent implements OnInit {
  projects: Map<number, SchedulingProject[]>;
  events: Map<number, Event>;
  eventId: number;

  constructor(private service: SchedulingService, private bottomSheet: MatBottomSheet,
              private dialog: MatDialog, private backend: BackendService,
              private ar: ActivatedRoute) {
  }

  get myProjects() {
    if (this.eventId !== undefined && this.projects !== undefined) {
      if (this.projects.has(this.eventId)) {
        return this.projects.get(this.eventId);
      } else {
        return [];
      }
    }
    return undefined;
  }

  ngOnInit() {
    this.service.getProjects().subscribe(res => {
      this.projects = new Map<number, SchedulingProject[]>();
      this.events = new Map<number, Event>();

      res.forEach((v, k) => {
        this.projects.set(k, v);
      });

      console.log(res);
      console.log(this.projects.get(1));
    });

    this.backend.getEditions().subscribe(events => {
      this.events = new Map<number, Event>();
      events.forEach(e => {
        this.events.set(e.id, e);
      });
    });
    this.ar.data.subscribe(data => this.eventId = data.eventId);
  }

  openBottomSheet() {
    if (this.projects.size > 0) {
      this.bottomSheet.open(CreateOrCopyProjectComponent, {
        data: {eventId: this.eventId, projects: this.projects, events: this.events}
      });
    } else {
      this.dialog.open(SchedulingProjectCreateComponent, {data: {eventId: this.eventId}});
    }
  }
}
