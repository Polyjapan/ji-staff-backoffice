import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormPageCreateComponent } from './form-page-create.component';

describe('FormPageCreateComponent', () => {
  let component: FormPageCreateComponent;
  let fixture: ComponentFixture<FormPageCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
