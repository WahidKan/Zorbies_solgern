import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { requirementAddEditComponent } from './requirement-add-edit.component';

describe('requirementAddEditComponent', () => {
  let component: requirementAddEditComponent;
  let fixture: ComponentFixture<requirementAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ requirementAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(requirementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
