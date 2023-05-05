import { TestBed } from '@angular/core/testing';

import { LoanapplicationreportService } from './loanapplicationreport.service';

describe('LoanapplicationreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanapplicationreportService = TestBed.get(LoanapplicationreportService);
    expect(service).toBeTruthy();
  });
});
