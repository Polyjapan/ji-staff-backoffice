import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingTaskFlowComponent } from './scheduling-task-flow.component';

describe('SchedulingTaskFlowComponent', () => {
  let component: SchedulingTaskFlowComponent;
  let fixture: ComponentFixture<SchedulingTaskFlowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingTaskFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingTaskFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
