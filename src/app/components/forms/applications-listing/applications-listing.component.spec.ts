import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsListingComponent } from './applications-listing.component';

describe('ApplicationsListingComponent', () => {
  let component: ApplicationsListingComponent;
  let fixture: ComponentFixture<ApplicationsListingComponent>;

  beforeEach(async(() => {
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
