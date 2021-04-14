import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealsSelectorComponent } from './meals-selector.component';

describe('MealsSelectorComponent', () => {
  let component: MealsSelectorComponent;
  let fixture: ComponentFixture<MealsSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
