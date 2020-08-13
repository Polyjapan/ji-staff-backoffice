import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingVersionsComponent } from './scheduling-versions.component';

describe('SchedulingVersionsComponent', () => {
  let component: SchedulingVersionsComponent;
  let fixture: ComponentFixture<SchedulingVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
