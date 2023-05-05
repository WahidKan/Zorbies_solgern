import { TestBed } from '@angular/core/testing';

import { MappingLocationService } from './mapping-location.service';

describe('MappingLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MappingLocationService = TestBed.get(MappingLocationService);
    expect(service).toBeTruthy();
  });
});
