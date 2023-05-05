import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineResultCalculationComponent } from './solgen-rule-engine-result-calculation.component';

describe('SolgenRuleEngineResultCalculationComponent', () => {
  let component: SolgenRuleEngineResultCalculationComponent;
  let fixture: ComponentFixture<SolgenRuleEngineResultCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineResultCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineResultCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
