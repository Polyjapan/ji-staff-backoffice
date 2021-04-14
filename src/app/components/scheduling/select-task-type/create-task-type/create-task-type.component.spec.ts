import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateTaskTypeComponent } from './create-task-type.component';

describe('CreateAccredTypeComponent', () => {
  let component: CreateTaskTypeComponent;
  let fixture: ComponentFixture<CreateTaskTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
