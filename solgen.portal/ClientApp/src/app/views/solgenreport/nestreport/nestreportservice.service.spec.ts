import { TestBed } from '@angular/core/testing';

import { NestreportserviceService } from './nestreportservice.service';

describe('NestreportserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NestreportserviceService = TestBed.get(NestreportserviceService);
    expect(service).toBeTruthy();
  });
});
