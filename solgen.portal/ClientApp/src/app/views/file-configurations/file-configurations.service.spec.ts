import { TestBed } from '@angular/core/testing';

import { FileConfigurationsService } from './file-configurations.service';

describe('FileConfigurationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileConfigurationsService = TestBed.get(FileConfigurationsService);
    expect(service).toBeTruthy();
  });
});
