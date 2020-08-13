import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {Event} from '../../../data/event';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {CreateOrCopyComponent} from './create-or-copy.component';
import {EventCreateComponent} from '../event-create/event-create.component';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-pick-edition',
  templateUrl: './pick-edition.component.html',
  styleUrls: ['./pick-edition.component.css']
})
export class PickEditionComponent implements OnInit {
  ev: Event[] = undefined;

  constructor(private backend: BackendService, private bottomSheet: MatBottomSheet, private dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe(url => this.reload());
    this.reload();
  }

  reload() {
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
