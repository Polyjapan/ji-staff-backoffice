import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsDealerComponent } from './meals-dealer.component';

describe('SelectUserComponent', () => {
  let component: MealsDealerComponent;
  let fixture: ComponentFixture<MealsDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
