import { TestBed } from '@angular/core/testing';

import { InsuarncerequestlistService } from './insuarncerequestlist.service';

describe('InsuarncerequestlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsuarncerequestlistService = TestBed.get(InsuarncerequestlistService);
    expect(service).toBeTruthy();
  });
});
