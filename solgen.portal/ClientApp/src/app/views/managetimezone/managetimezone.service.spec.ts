import { TestBed } from '@angular/core/testing';

import { ManagetimezoneService } from './managetimezone.service';

describe('ManagetimezoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagetimezoneService = TestBed.get(ManagetimezoneService);
    expect(service).toBeTruthy();
  });
});
