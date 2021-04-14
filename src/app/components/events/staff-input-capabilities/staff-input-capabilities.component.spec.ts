import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaffInputCapabilitiesComponent } from './staff-input-capabilities.component';

describe('StaffInputCapabilitiesComponent', () => {
  let component: StaffInputCapabilitiesComponent;
  let fixture: ComponentFixture<StaffInputCapabilitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffInputCapabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffInputCapabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
