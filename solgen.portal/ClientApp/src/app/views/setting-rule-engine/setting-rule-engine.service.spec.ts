import { TestBed } from '@angular/core/testing';

import { SettingRuleEngineService } from './setting-rule-engine.service';

describe('SettingRuleEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingRuleEngineService = TestBed.get(SettingRuleEngineService);
    expect(service).toBeTruthy();
  });
});
