import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealsDealerComponent } from './meals-dealer.component';

describe('SelectUserComponent', () => {
  let component: MealsDealerComponent;
  let fixture: ComponentFixture<MealsDealerComponent>;

  beforeEach(waitForAsync(() => {
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
