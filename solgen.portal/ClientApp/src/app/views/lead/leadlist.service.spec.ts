import { TestBed } from '@angular/core/testing';

import { LeadlistService } from './leadlist.service';

describe('LeadlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadlistService = TestBed.get(LeadlistService);
    expect(service).toBeTruthy();
  });
});
