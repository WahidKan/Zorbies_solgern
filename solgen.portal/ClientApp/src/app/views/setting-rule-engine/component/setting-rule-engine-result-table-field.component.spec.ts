import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRuleEngineResultTableFieldComponent } from './setting-rule-engine-result-table-field.component';

describe('SettingRuleEngineResultTableFieldComponent', () => {
  let component: SettingRuleEngineResultTableFieldComponent;
  let fixture: ComponentFixture<SettingRuleEngineResultTableFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRuleEngineResultTableFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRuleEngineResultTableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
