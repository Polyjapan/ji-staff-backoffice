import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingProjectCreateComponent } from './scheduling-project-create.component';

describe('SchedulingProjectCreateComponent', () => {
  let component: SchedulingProjectCreateComponent;
  let fixture: ComponentFixture<SchedulingProjectCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingProjectCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
