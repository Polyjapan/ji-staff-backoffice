import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CreateSchedulingProject} from '../../../data/scheduling/schedulingProject';
import {SchedulingService} from '../../../services/scheduling.service';

@Component({
  selector: 'app-scheduling-project-create',
  templateUrl: './scheduling-project-create.component.html',
  styleUrls: ['./scheduling-project-create.component.css']
})
export class SchedulingProjectCreateComponent implements OnInit {
  project: CreateSchedulingProject;
  sending: boolean = false;
  eventId: number;

  constructor(
    public dialogRef: MatDialogRef<SchedulingProjectCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SchedulingProjectCreateData,
    private backend: SchedulingService,
    private router: Router) {

    this.project = new CreateSchedulingProject();
    if (data) {
      this.eventId = data.eventId;
      if (data.copyOf) {
        this.project.copyOf = data.copyOf;
      }
    } else {
      alert('No data, this should not happen.');
    }
  }

  ngOnInit() {
  }

  submit() {
    if (this.sending) {
      return;
    }

    this.sending = true;
    try {
      this.backend
        .createProject(this.eventId, this.project)
        .subscribe(targetId => {
          this.router.navigate(['/', 'event', this.eventId, 'scheduling', targetId]);
          this.dialogRef.close();
        });
    } catch (e) {
      e.print();
      console.log(e);
      this.sending = false;
    }
  }

}

export interface SchedulingProjectCreateData {
  copyOf?: number; // Used to ask the server to clone a project
  eventId: number;
}
