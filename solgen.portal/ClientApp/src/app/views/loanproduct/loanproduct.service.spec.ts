import { TestBed } from '@angular/core/testing';

import { LoanproductService } from './loanproduct.service';

describe('LoanproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanproductService = TestBed.get(LoanproductService);
    expect(service).toBeTruthy();
  });
});
