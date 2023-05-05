import { TestBed } from '@angular/core/testing';

import { SearchastypeService } from './searchastype.service';

describe('SearchastypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchastypeService = TestBed.get(SearchastypeService);
    expect(service).toBeTruthy();
  });
});
