import { TestBed } from '@angular/core/testing';

import { ConfigurationsettingService } from './configurationsetting.service';

describe('ConfigurationsettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurationsettingService = TestBed.get(ConfigurationsettingService);
    expect(service).toBeTruthy();
  });
});
