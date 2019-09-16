import {Component, Inject, OnInit} from '@angular/core';
import {Event} from '../../data/event';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  event: Event;
  copyOf?: number;

  constructor(
    public dialogRef: MatDialogRef<EventCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventCreateData) {

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

}

export interface EventCreateData {
  event?: Event; // Event to update
  copyOf?: number; // Used to ask the server to clone the event
}
