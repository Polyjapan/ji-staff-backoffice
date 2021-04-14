import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingProjectsComponent } from './scheduling-projects.component';

describe('SchedulingProjectsComponent', () => {
  let component: SchedulingProjectsComponent;
  let fixture: ComponentFixture<SchedulingProjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
