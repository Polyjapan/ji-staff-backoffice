import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsListingComponent } from './staffs-listing.component';

describe('StaffsListingComponent', () => {
  let component: StaffsListingComponent;
  let fixture: ComponentFixture<StaffsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
