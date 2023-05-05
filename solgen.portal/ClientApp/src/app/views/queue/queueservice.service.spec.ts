import { TestBed } from '@angular/core/testing';

import { QueueserviceService } from './queueservice.service';

describe('QueueserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueueserviceService = TestBed.get(QueueserviceService);
    expect(service).toBeTruthy();
  });
});
