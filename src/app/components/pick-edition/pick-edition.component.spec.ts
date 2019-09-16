import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickEditionComponent } from './pick-edition.component';

describe('PickEditionComponent', () => {
  let component: PickEditionComponent;
  let fixture: ComponentFixture<PickEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
