import { TestBed } from '@angular/core/testing';

import { DocumentMakerSubModuleMappingService } from './document-maker-sub-module-mapping.service';

describe('DocumentMakerSubModuleMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentMakerSubModuleMappingService = TestBed.get(DocumentMakerSubModuleMappingService);
    expect(service).toBeTruthy();
  });
});
