import {Component, Inject, OnInit} from '@angular/core';
import {Event} from '../../../data/event';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../../services/backend.service';
import {Router} from '@angular/router';
import {InvalidationService} from '../../../services/invalidation.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  event: Event;
  copyOf?: number;
  sending: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EventCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventCreateData,
    private backend: BackendService,
    private router: Router,
    private invalidate: InvalidationService) {

    if (data) {
      if (data.event) {
        this.event = data.event;
      }

      if (data.copyOf) {
        this.copyOf = data.copyOf;
      }
    }

    if (!this.event) {
      this.event = new Event();
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
      if (this.event.eventId) {
        this.backend.updateEdition(this.event)
          .subscribe(u => {
            this.invalidate.invalidate('event-' + this.event.eventId);
            this.dialogRef.close();
          });
      } else {
        this.backend
          .createEdition(this.event, this.copyOf)
          .subscribe(targetId => {
            this.router.navigate(['/', 'event', targetId]);
            this.dialogRef.close();
          });
      }
    } catch (e) {
      e.print();
      console.log(e);
      this.sending = false;
    }
  }

}

export interface EventCreateData {
  event?: Event; // Event to update
  copyOf?: number; // Used to ask the server to clone the event
}
