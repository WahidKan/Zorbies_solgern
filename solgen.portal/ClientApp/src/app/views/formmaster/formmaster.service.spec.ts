import { TestBed } from '@angular/core/testing';

import { FormmasterService } from './formmaster.service';

describe('FormmasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormmasterService = TestBed.get(FormmasterService);
    expect(service).toBeTruthy();
  });
});
