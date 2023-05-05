import { TestBed } from '@angular/core/testing';

import { ContractMappingService } from './contract-mapping.service';

describe('ContractMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractMappingService = TestBed.get(ContractMappingService);
    expect(service).toBeTruthy();
  });
});
