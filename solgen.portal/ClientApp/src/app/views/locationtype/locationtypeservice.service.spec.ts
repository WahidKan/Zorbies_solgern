import { TestBed } from '@angular/core/testing';

import { LocationtypeserviceService } from './locationtypeservice.service';

describe('LocationtypeserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationtypeserviceService = TestBed.get(LocationtypeserviceService);
    expect(service).toBeTruthy();
  });
});
