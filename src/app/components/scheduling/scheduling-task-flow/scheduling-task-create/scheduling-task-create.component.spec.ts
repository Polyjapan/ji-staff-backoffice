import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingTaskCreateComponent } from './scheduling-task-create.component';

describe('SchedulingTaskCreateComponent', () => {
  let component: SchedulingTaskCreateComponent;
  let fixture: ComponentFixture<SchedulingTaskCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingTaskCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingTaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
