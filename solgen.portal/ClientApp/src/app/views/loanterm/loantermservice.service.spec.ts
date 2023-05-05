import { TestBed } from '@angular/core/testing';

import { LoantermserviceService } from './loantermservice.service';

describe('LoantermserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoantermserviceService = TestBed.get(LoantermserviceService);
    expect(service).toBeTruthy();
  });
});
