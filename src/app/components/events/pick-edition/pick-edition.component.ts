import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {Event, Visibility} from '../../../data/event';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pick-edition',
  templateUrl: './pick-edition.component.html',
  styleUrls: ['./pick-edition.component.css']
})
export class PickEditionComponent implements OnInit {
  ev: Event[] = undefined;
  Visibility = Visibility;

  constructor(private backend: BackendService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe(url => this.reload());
    this.reload();
  }

  reload() {
    this.backend.getEditions().subscribe(ev => this.ev = ev
      .sort((a, b) => -a.id + b.id)
      .map(e => {
        e.start = new Date(e.start as any as string);
        return e;
      }));
  }
}
