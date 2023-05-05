import { TestBed } from '@angular/core/testing';

import { LoanapplicationserviceService } from './loanapplicationservice.service';

describe('LoanapplicationserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanapplicationserviceService = TestBed.get(LoanapplicationserviceService);
    expect(service).toBeTruthy();
  });
});
