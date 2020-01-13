import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskTypeComponent } from './create-task-type.component';

describe('CreateAccredTypeComponent', () => {
  let component: CreateTaskTypeComponent;
  let fixture: ComponentFixture<CreateTaskTypeComponent>;

  beforeEach(async(() => {
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
