import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {ActivatedRoute} from '@angular/router';
import {ApplicationResult, CommentWithAuthor} from '../../../data/applications';
import {ApplicationState, readableState} from '../../../data/state';
import {MatButton} from '@angular/material/button';

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

  postingComment: string;
  postingCommentPublic: boolean;
  postingCommentSending: boolean;

  private applicationId: number;

  constructor(private backend: BackendService, private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.ar.paramMap.subscribe(map => {
      this.applicationId = Number.parseInt(map.get('id'), 10);
      this.backend.getApplication(this.applicationId).subscribe(app => this.application = app);
      this.reloadComments();
    });
  }

  date(timestamp: number) {
    return new Date(timestamp);
  }

  setStatus(button: MatButton, state: ApplicationState) {
    button.disabled = true;

    this.backend.setState(this.applicationId, state).subscribe(succ => {
      this.application.state = state;
      button.disabled = false;
    });
  }

  sendComment() {
    const comment = {
      applicationId: 0,
      userId: 0,
      value: this.postingComment,
      timestamp: new Date().getTime(),
      userVisible: this.postingCommentPublic
    };

    this.postingCommentSending = true;
    this.backend.addComment(this.applicationId, comment).subscribe(success => {
      this.reloadComments();
      this.postingCommentSending = false;
      this.postingComment = undefined;
      this.postingCommentPublic = undefined;
    });
  }

  private reloadComments() {
    this.backend.getComments(this.applicationId).subscribe(comm => this.comments = comm);
  }
}
