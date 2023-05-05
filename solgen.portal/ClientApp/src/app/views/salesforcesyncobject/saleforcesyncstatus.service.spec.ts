import { TestBed } from '@angular/core/testing';

import { SaleforcesyncstatusService } from './saleforcesyncstatus.service';

describe('SaleforcesyncstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleforcesyncstatusService = TestBed.get(SaleforcesyncstatusService);
    expect(service).toBeTruthy();
  });
});
