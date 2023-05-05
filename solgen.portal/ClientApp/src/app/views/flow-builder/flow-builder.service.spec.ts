import { TestBed } from '@angular/core/testing';

import { FlowBuilderService } from './flow-builder.service';

describe('FlowBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlowBuilderService = TestBed.get(FlowBuilderService);
    expect(service).toBeTruthy();
  });
});
