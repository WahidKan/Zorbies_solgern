import { TestBed } from '@angular/core/testing';

import { FbMarketingService } from './fb-marketing.service';

describe('FbMarketingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbMarketingService = TestBed.get(FbMarketingService);
    expect(service).toBeTruthy();
  });
});
