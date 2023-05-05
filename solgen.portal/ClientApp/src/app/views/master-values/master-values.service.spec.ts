import { TestBed } from '@angular/core/testing';

import { MasterValuesService } from './master-values.service';

describe('MasterValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterValuesService = TestBed.get(MasterValuesService);
    expect(service).toBeTruthy();
  });
});
