import { TestBed } from '@angular/core/testing';

import { CalllogdetailService } from './calllogdetail.service';

describe('CalllogdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalllogdetailService = TestBed.get(CalllogdetailService);
    expect(service).toBeTruthy();
  });
});
