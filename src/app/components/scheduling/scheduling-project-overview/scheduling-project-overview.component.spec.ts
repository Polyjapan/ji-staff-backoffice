import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingProjectOverviewComponent } from './scheduling-project-overview.component';

describe('SchedulingProjectOverviewComponent', () => {
  let component: SchedulingProjectOverviewComponent;
  let fixture: ComponentFixture<SchedulingProjectOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingProjectOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingProjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
