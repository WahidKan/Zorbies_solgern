import { TestBed } from '@angular/core/testing';

import { PricebookService } from './pricebook.service';

describe('PricebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricebookService = TestBed.get(PricebookService);
    expect(service).toBeTruthy();
  });
});
