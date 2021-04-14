import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormPageEditComponent } from './form-page-edit.component';

describe('FormPageEditComponent', () => {
  let component: FormPageEditComponent;
  let fixture: ComponentFixture<FormPageEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
