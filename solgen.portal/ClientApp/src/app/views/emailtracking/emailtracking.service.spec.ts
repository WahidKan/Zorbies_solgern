import { TestBed } from '@angular/core/testing';

import { EmailtrackingService } from './emailtracking.service';

describe('EmailtrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailtrackingService = TestBed.get(EmailtrackingService);
    expect(service).toBeTruthy();
  });
});
