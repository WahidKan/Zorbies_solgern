import { TestBed } from '@angular/core/testing';

import { LeasefundingpackagelistService } from './leasefundingpackagelist.service';

describe('LeasefundingpackagelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeasefundingpackagelistService = TestBed.get(LeasefundingpackagelistService);
    expect(service).toBeTruthy();
  });
});
