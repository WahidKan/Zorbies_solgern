import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRuleEngineTargetComponent } from './setting-rule-engine-target.component';

describe('SettingRuleEngineTargetComponent', () => {
  let component: SettingRuleEngineTargetComponent;
  let fixture: ComponentFixture<SettingRuleEngineTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRuleEngineTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRuleEngineTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
