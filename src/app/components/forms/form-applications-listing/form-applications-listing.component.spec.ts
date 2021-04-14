import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormApplicationsListingComponent } from './form-applications-listing.component';

describe('FormApplicationsListingComponent', () => {
  let component: FormApplicationsListingComponent;
  let fixture: ComponentFixture<FormApplicationsListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormApplicationsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormApplicationsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
