import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffArrivalDepartureComponent } from './staff-arrival-departure.component';

describe('StaffArrivalDepartureComponent', () => {
  let component: StaffArrivalDepartureComponent;
  let fixture: ComponentFixture<StaffArrivalDepartureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffArrivalDepartureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffArrivalDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
