import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {Event} from '../../data/event';
import {BackendService} from '../../services/backend.service';
import {InvalidationService, SubscribedListener} from '../../services/invalidation.service';

@Component({
  selector: 'app-event-parent',
  templateUrl: './event-parent.component.html',
  styleUrls: ['./event-parent.component.css']
})
export class EventParentComponent implements OnInit {
  mobileQuery: MediaQueryList;
  event: Event;
  subUrl: string;
  private eventInvalidation: SubscribedListener;
  private mobileQueryListener: () => void;

  private evId: number;
  private currentOutlet: RouterOutlet;

  constructor(private ar: ActivatedRoute, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private back: BackendService, private inval: InvalidationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  act(event, elem: RouterOutlet) {
    this.currentOutlet = elem;
    elem.activatedRouteData.eventId = this.evId;
    this.subUrl = elem.activatedRoute.snapshot.routeConfig.path;
    if (this.event) {
      elem.activatedRouteData.event = this.event;
    }
  }

  private loadEdition(outlet?: RouterOutlet) {
    this.back.getEdition(this.evId).subscribe(e => {
      this.event = e;

      if (outlet && outlet.activatedRouteData) {
        outlet.activatedRouteData.event = e;
      }
    });
  }

  private changeEvId(id: string) {
    const oldEvId = this.evId;
    this.evId = Number.parseInt(id, 10);

    if (this.evId !== oldEvId) {
      this.event = undefined;
      if (this.eventInvalidation) {
        this.eventInvalidation.cancel();
      }
    }

    this.eventInvalidation = this.inval.listen('event-' + this.evId, () => {
      this.loadEdition(this.currentOutlet);
    });
    this.loadEdition(this.currentOutlet);
  }


  ngOnInit(): void {
    this.ar.paramMap.map(data => data.get('id'))
      .subscribe(id => this.changeEvId(this.ar.snapshot.paramMap.get('id')));
  }
}

