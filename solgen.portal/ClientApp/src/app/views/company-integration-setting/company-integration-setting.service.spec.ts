import { TestBed } from '@angular/core/testing';

import { CompanyIntegrationSettingService } from './company-integration-setting.service';

describe('CompanyIntegrationSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyIntegrationSettingService = TestBed.get(CompanyIntegrationSettingService);
    expect(service).toBeTruthy();
  });
});
