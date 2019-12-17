import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingProjectsComponent } from './scheduling-projects.component';

describe('SchedulingProjectsComponent', () => {
  let component: SchedulingProjectsComponent;
  let fixture: ComponentFixture<SchedulingProjectsComponent>;

  beforeEach(async(() => {
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
