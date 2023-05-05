import { TestBed } from '@angular/core/testing';

import { DesignationService } from './designationservice.service';

describe('DesignationserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignationService = TestBed.get(DesignationService);
    expect(service).toBeTruthy();
  });
});
