import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineCustomFormulaComponent } from './solgen-rule-engine-custom-formula.component';

describe('SolgenRuleEngineCustomFormulaComponent', () => {
  let component: SolgenRuleEngineCustomFormulaComponent;
  let fixture: ComponentFixture<SolgenRuleEngineCustomFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineCustomFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineCustomFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
