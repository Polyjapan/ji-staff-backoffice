import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaffsInputLevelsComponent } from './staffs-input-levels.component';

describe('StaffsInputLevelsComponent', () => {
  let component: StaffsInputLevelsComponent;
  let fixture: ComponentFixture<StaffsInputLevelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsInputLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsInputLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
