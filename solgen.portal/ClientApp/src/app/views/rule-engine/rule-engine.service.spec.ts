import { TestBed } from '@angular/core/testing';

import { RuleEngineService } from './rule-engine.service';

describe('RuleEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuleEngineService = TestBed.get(RuleEngineService);
    expect(service).toBeTruthy();
  });
});
