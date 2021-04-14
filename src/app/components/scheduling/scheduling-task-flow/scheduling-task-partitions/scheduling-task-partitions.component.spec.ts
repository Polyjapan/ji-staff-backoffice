import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingTaskPartitionsComponent } from './scheduling-task-partitions.component';

describe('SchedulingTaskPartitionsComponent', () => {
  let component: SchedulingTaskPartitionsComponent;
  let fixture: ComponentFixture<SchedulingTaskPartitionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingTaskPartitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingTaskPartitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
