import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParamsComponent } from './event-params.component';

describe('EventParamsComponent', () => {
  let component: EventParamsComponent;
  let fixture: ComponentFixture<EventParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
