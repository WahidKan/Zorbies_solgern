import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { requirementComponent } from './requirement.component';

describe('RequirementComponent', () => {
  let component: requirementComponent;
  let fixture: ComponentFixture<requirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ requirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(requirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
