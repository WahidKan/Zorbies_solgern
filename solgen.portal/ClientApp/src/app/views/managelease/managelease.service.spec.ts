import { TestBed } from '@angular/core/testing';

import { ManageleaseService } from './managelease.service';

describe('ManageleaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageleaseService = TestBed.get(ManageleaseService);
    expect(service).toBeTruthy();
  });
});
