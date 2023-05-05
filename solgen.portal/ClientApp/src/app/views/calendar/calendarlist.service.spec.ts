import { TestBed } from '@angular/core/testing';

import { CalendarlistService } from './calendarlist.service';

describe('CalendarlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarlistService = TestBed.get(CalendarlistService);
    expect(service).toBeTruthy();
  });
});
