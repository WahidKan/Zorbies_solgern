import { TestBed } from '@angular/core/testing';

import { ScheduleAppointmentService } from './schedule-appointment.service';

describe('ScheduleAppointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduleAppointmentService = TestBed.get(ScheduleAppointmentService);
    expect(service).toBeTruthy();
  });
});
