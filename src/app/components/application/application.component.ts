import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ActivatedRoute} from '@angular/router';
import {ApplicationResult, CommentWithAuthor} from '../../data/applications';
import {ApplicationState, readableState} from '../../data/state';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  application: ApplicationResult;
  ApplicationState = ApplicationState;
  readable = readableState;
  comments: CommentWithAuthor[];

  private applicationId: number;

  constructor(private backend: BackendService, private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.ar.paramMap.subscribe(map => {
      this.applicationId = Number.parseInt(map.get('id'), 10);
      this.backend.getApplication(this.applicationId).subscribe(app => this.application = app);
      this.backend.getComments(this.applicationId).subscribe(comm => this.comments = comm);
    });
  }

  date(timestamp: number) {
    return new Date(timestamp);
  }
}
