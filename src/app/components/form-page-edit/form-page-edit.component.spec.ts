import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageEditComponent } from './form-page-edit.component';

describe('FormPageEditComponent', () => {
  let component: FormPageEditComponent;
  let fixture: ComponentFixture<FormPageEditComponent>;

  beforeEach(async(() => {
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
