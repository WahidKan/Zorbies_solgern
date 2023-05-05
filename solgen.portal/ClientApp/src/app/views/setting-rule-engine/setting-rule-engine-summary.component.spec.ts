import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRuleEngineSummaryComponent } from './setting-rule-engine-summary.component';

describe('SettingRuleEngineSummaryComponent', () => {
  let component: SettingRuleEngineSummaryComponent;
  let fixture: ComponentFixture<SettingRuleEngineSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRuleEngineSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRuleEngineSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
