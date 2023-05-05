import { TestBed } from '@angular/core/testing';

import { ManageservicecrewService } from './manageservicecrew.service';

describe('ManageservicecrewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageservicecrewService = TestBed.get(ManageservicecrewService);
    expect(service).toBeTruthy();
  });
});
