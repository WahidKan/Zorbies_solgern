import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEngineAddOrEditComponent } from './rule-engine-add-or-edit.component';

describe('RuleEngineAddOrEditComponent', () => {
  let component: RuleEngineAddOrEditComponent;
  let fixture: ComponentFixture<RuleEngineAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleEngineAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEngineAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
