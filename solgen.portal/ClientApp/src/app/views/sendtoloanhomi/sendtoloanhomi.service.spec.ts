import { TestBed } from '@angular/core/testing';

import { SendtoloanhomiService } from './sendtoloanhomi.service';

describe('SendtoloanhomiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendtoloanhomiService = TestBed.get(SendtoloanhomiService);
    expect(service).toBeTruthy();
  });
});
