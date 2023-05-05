import { TestBed } from '@angular/core/testing';

import { requirementService } from './requirement.service';

describe('RequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: requirementService = TestBed.get(requirementService);
    expect(service).toBeTruthy();
  });
});
