import { TestBed } from '@angular/core/testing';

import { ProductrequiredserviceService } from './productrequiredservice.service';

describe('ProductrequiredserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductrequiredserviceService = TestBed.get(ProductrequiredserviceService);
    expect(service).toBeTruthy();
  });
});
