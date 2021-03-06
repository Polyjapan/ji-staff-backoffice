import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingTaskPartitionEditComponent } from './scheduling-task-partition-edit.component';

describe('SchedulingTaskPartitionEditComponent', () => {
  let component: SchedulingTaskPartitionEditComponent;
  let fixture: ComponentFixture<SchedulingTaskPartitionEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingTaskPartitionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingTaskPartitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
