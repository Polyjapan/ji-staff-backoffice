import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHomeComponent } from './event-params.component';

describe('EventParamsComponent', () => {
  let component: EventHomeComponent;
  let fixture: ComponentFixture<EventHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
