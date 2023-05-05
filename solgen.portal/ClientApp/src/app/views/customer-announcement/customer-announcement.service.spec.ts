import { TestBed } from '@angular/core/testing';

import { CustomerAnnouncementService } from './customer-announcement.service';

describe('CustomerAnnouncementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerAnnouncementService = TestBed.get(CustomerAnnouncementService);
    expect(service).toBeTruthy();
  });
});
