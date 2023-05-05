import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRuleEngineConditionComponent } from './setting-rule-engine-condition.component';

describe('SettingRuleEngineConditionComponent', () => {
  let component: SettingRuleEngineConditionComponent;
  let fixture: ComponentFixture<SettingRuleEngineConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRuleEngineConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRuleEngineConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
