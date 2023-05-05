import { TestBed } from '@angular/core/testing';

import { ServiceresourseService } from './serviceresourse.service';

describe('ServiceresourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceresourseService = TestBed.get(ServiceresourseService);
    expect(service).toBeTruthy();
  });
});
