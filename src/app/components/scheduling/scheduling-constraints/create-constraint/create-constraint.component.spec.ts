import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateConstraintComponent } from './create-constraint.component';

describe('CreateConstraintComponent', () => {
  let component: CreateConstraintComponent;
  let fixture: ComponentFixture<CreateConstraintComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConstraintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
