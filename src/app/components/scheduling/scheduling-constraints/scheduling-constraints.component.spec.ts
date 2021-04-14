import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingConstraintsComponent } from './scheduling-constraints.component';

describe('SchedulingConstraintsComponent', () => {
  let component: SchedulingConstraintsComponent;
  let fixture: ComponentFixture<SchedulingConstraintsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingConstraintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingConstraintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
