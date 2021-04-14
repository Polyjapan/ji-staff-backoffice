import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SetAdditionalFormComponent } from './set-additional-form.component';

describe('SetAdditionalFormComponent', () => {
  let component: SetAdditionalFormComponent;
  let fixture: ComponentFixture<SetAdditionalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAdditionalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAdditionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
