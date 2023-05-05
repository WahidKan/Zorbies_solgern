import { TestBed } from '@angular/core/testing';

import { HtmlBuilderformService } from './html-builderform.service';

describe('HtmlBuilderformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HtmlBuilderformService = TestBed.get(HtmlBuilderformService);
    expect(service).toBeTruthy();
  });
});
