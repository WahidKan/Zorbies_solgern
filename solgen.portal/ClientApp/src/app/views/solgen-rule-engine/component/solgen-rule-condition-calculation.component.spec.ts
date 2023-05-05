import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleConditionCalculationComponent } from './solgen-rule-condition-calculation.component';

describe('SolgenRuleConditionCalculationComponent', () => {
  let component: SolgenRuleConditionCalculationComponent;
  let fixture: ComponentFixture<SolgenRuleConditionCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleConditionCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleConditionCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
