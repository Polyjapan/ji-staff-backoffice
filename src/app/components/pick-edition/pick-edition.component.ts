import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {Event} from '../../data/event';
import {MatBottomSheet, MatDialog} from '@angular/material';
import {CreateOrCopyComponent} from './create-or-copy.component';
import {EventCreateComponent} from '../event-create/event-create.component';

@Component({
  selector: 'app-pick-edition',
  templateUrl: './pick-edition.component.html',
  styleUrls: ['./pick-edition.component.css']
})
export class PickEditionComponent implements OnInit {
  ev: Event[] = undefined;

  constructor(private backend: BackendService, private bottomSheet: MatBottomSheet, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.backend.getEditions().subscribe(ev => this.ev = ev.sort((a, b) => (a.isActive) ? (b.isActive ? 0 : -1) : 1));
  }

  openBottomSheet() {
    if (this.ev.length > 0) {
      this.bottomSheet.open(CreateOrCopyComponent, {
        data: {ev: this.ev}
      });
    } else {
      this.dialog.open(EventCreateComponent);
    }
  }
}
