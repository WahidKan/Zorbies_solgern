import { TestBed } from '@angular/core/testing';

import { BankInformationService } from './bank-information.service';

describe('BankInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankInformationService = TestBed.get(BankInformationService);
    expect(service).toBeTruthy();
  });
});
