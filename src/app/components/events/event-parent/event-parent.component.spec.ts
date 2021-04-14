import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventParentComponent } from './event-parent.component';

describe('EventParentComponent', () => {
  let component: EventParentComponent;
  let fixture: ComponentFixture<EventParentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
