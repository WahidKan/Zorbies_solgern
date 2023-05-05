import { TestBed } from '@angular/core/testing';

import { MappingMembersService } from './mapping-members.service';

describe('MappingMembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MappingMembersService = TestBed.get(MappingMembersService);
    expect(service).toBeTruthy();
  });
});
