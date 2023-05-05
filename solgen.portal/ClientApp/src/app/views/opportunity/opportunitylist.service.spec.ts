import { TestBed } from '@angular/core/testing';

import { OpportunityListService } from './opportunitylist.service';

describe('OpportunitylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunityListService = TestBed.get(OpportunityListService);
    expect(service).toBeTruthy();
  });
});
