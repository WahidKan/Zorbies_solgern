import { TestBed } from '@angular/core/testing';

import { DocumentMakerRouteRuleService } from './document-maker-route-rule.service';

describe('DocumentMakerRouteRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentMakerRouteRuleService = TestBed.get(DocumentMakerRouteRuleService);
    expect(service).toBeTruthy();
  });
});
