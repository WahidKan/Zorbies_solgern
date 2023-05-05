import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRuleEngineResultComponent } from './setting-rule-engine-result.component';

describe('SettingRuleEngineResultComponent', () => {
  let component: SettingRuleEngineResultComponent;
  let fixture: ComponentFixture<SettingRuleEngineResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRuleEngineResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRuleEngineResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
