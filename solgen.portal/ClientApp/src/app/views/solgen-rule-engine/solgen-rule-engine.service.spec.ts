import { TestBed } from '@angular/core/testing';

import { SolgenRuleEngineService } from './solgen-rule-engine.service';

describe('SolgenRuleEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolgenRuleEngineService = TestBed.get(SolgenRuleEngineService);
    expect(service).toBeTruthy();
  });
});