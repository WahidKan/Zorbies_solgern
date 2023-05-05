import { TestBed } from '@angular/core/testing';

import { WhatsnextService } from './whatsnext.service';

describe('WhatsnextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhatsnextService = TestBed.get(WhatsnextService);
    expect(service).toBeTruthy();
  });
});
