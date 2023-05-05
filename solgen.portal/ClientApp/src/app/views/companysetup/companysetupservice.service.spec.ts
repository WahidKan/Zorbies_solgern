import { TestBed } from '@angular/core/testing';

import { CompanysetupserviceService } from './companysetupservice.service';

describe('CompanysetupserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanysetupserviceService = TestBed.get(CompanysetupserviceService);
    expect(service).toBeTruthy();
  });
});
