import { TestBed } from '@angular/core/testing';

import { InsuranceService } from './insurance.service';

describe('InsurancelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsuranceService = TestBed.get(InsuranceService);
    expect(service).toBeTruthy();
  });
});
