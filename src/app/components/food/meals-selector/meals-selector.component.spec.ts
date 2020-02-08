import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsSelectorComponent } from './meals-selector.component';

describe('MealsSelectorComponent', () => {
  let component: MealsSelectorComponent;
  let fixture: ComponentFixture<MealsSelectorComponent>;

  beforeEach(async(() => {
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
