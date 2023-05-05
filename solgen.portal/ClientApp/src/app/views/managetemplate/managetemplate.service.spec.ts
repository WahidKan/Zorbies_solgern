import { TestBed } from '@angular/core/testing';

import { ManagetemplateService } from './managetemplate.service';

describe('ManagetemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagetemplateService = TestBed.get(ManagetemplateService);
    expect(service).toBeTruthy();
  });
});
