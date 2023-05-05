import { TestBed } from '@angular/core/testing';

import { AddInsuranceService } from './add-insurance.service';

describe('AddInsuranceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddInsuranceService = TestBed.get(AddInsuranceService);
    expect(service).toBeTruthy();
  });
});
