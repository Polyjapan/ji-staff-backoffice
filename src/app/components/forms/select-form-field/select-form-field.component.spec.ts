import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectFormFieldComponent } from './select-form-field.component';

describe('SelectFormFieldComponent', () => {
  let component: SelectFormFieldComponent;
  let fixture: ComponentFixture<SelectFormFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
