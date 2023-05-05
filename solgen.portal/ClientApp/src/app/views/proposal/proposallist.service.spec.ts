import { TestBed } from '@angular/core/testing';

import { ProposallistService } from './proposallist.service';

describe('ProposallistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProposallistService = TestBed.get(ProposallistService);
    expect(service).toBeTruthy();
  });
});
