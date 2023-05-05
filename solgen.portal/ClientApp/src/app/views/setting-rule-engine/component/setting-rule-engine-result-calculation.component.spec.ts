import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRuleEngineResultCalculationComponent } from './setting-rule-engine-result-calculation.component';

describe('SettingRuleEngineResultCalculationComponent', () => {
  let component: SettingRuleEngineResultCalculationComponent;
  let fixture: ComponentFixture<SettingRuleEngineResultCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRuleEngineResultCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRuleEngineResultCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
