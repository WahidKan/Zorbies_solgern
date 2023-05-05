import { TestBed } from '@angular/core/testing';

import { AddeditinsuranceService } from './addeditinsurance.service';

describe('AddeditinsuranceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddeditinsuranceService = TestBed.get(AddeditinsuranceService);
    expect(service).toBeTruthy();
  });
});
