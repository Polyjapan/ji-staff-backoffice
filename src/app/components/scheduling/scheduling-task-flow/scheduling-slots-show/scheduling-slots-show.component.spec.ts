import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulingSlotsShowComponent } from './scheduling-slots-show.component';

describe('SchedulingSlotsShowComponent', () => {
  let component: SchedulingSlotsShowComponent;
  let fixture: ComponentFixture<SchedulingSlotsShowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingSlotsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingSlotsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
