import { TestBed } from '@angular/core/testing';

import { ProposalMappingService } from './proposal-mapping.service';

describe('MappingLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProposalMappingService = TestBed.get(ProposalMappingService);
    expect(service).toBeTruthy();
  });
});
