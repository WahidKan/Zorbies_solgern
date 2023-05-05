import { TestBed } from '@angular/core/testing';

import { LeadCallHistoryService } from './lead-call-history.service';

describe('LeadCallHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadCallHistoryService = TestBed.get(LeadCallHistoryService);
    expect(service).toBeTruthy();
  });
});
