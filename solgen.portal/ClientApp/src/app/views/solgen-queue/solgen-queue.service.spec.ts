import { TestBed } from '@angular/core/testing';

import { SolgenQueueService } from './solgen-queue.service';

describe('SolgenQueueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolgenQueueService = TestBed.get(SolgenQueueService);
    expect(service).toBeTruthy();
  });
});
