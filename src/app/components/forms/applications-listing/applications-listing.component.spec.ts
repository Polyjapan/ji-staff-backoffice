import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApplicationsListingComponent } from './applications-listing.component';

describe('ApplicationsListingComponent', () => {
  let component: ApplicationsListingComponent;
  let fixture: ComponentFixture<ApplicationsListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
