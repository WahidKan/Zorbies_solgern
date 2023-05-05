import { TestBed } from '@angular/core/testing';

import { TrackerlistService } from './trackerlist.service';

describe('TrackerlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackerlistService = TestBed.get(TrackerlistService);
    expect(service).toBeTruthy();
  });
});
