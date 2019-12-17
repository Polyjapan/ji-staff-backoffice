import { Component, OnInit } from '@angular/core';
import {Event} from '../../../data/event';
import {SchedulingProject} from '../../../data/scheduling/schedulingProject';
import {SchedulingService} from '../../../services/scheduling.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-scheduling-projects',
  templateUrl: './scheduling-projects.component.html',
  styleUrls: ['./scheduling-projects.component.css']
})
export class SchedulingProjectsComponent implements OnInit {
  projects: Map<number, SchedulingProject[]>;
  events: Map<number, Event>;
  eventId: number;

  constructor(private service: SchedulingService, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.service.getProjects().subscribe(res => {
      this.projects = new Map<number, SchedulingProject[]>();
      this.events = new Map<number, Event>();

      res.forEach((v, k) => {
        console.log(k)
        console.log(v)
        this.projects.set(k.eventId, v);
        this.events.set(k.eventId, k);
      });

      console.log(res);
      console.log(this.projects.get(1));
    });
    this.ar.data.subscribe(data => this.eventId = data.eventId);
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

}
