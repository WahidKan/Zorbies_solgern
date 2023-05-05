import { TestBed } from '@angular/core/testing';

import { VendorleaserequestlistService } from './vendorleaserequestlist.service';

describe('VendorleaserequestlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorleaserequestlistService = TestBed.get(VendorleaserequestlistService);
    expect(service).toBeTruthy();
  });
});
