import { TestBed } from '@angular/core/testing';

import { WorkOrderMappingService } from './work-order-mapping.service';

describe('WorkOrderMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkOrderMappingService = TestBed.get(WorkOrderMappingService);
    expect(service).toBeTruthy();
  });
});
