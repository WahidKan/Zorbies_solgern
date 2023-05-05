import { TestBed } from '@angular/core/testing';

import { CustomerdocumentService } from './customerdocument.service';

describe('CustomerdocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerdocumentService = TestBed.get(CustomerdocumentService);
    expect(service).toBeTruthy();
  });
});
