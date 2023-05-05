import { TestBed } from '@angular/core/testing';

import { UsertypeserviceService } from './usertypeservice.service';

describe('UsertypeserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsertypeserviceService = TestBed.get(UsertypeserviceService);
    expect(service).toBeTruthy();
  });
});
