import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTaskTypeComponent } from './select-task-type.component';

describe('SelectLenderComponent', () => {
  let component: SelectTaskTypeComponent;
  let fixture: ComponentFixture<SelectTaskTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTaskTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTaskTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
