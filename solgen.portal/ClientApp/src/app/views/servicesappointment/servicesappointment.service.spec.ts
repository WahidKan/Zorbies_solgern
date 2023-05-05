import { TestBed } from '@angular/core/testing';

import { ServicesappointmentService } from './servicesappointment.service';

describe('ServicesappointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesappointmentService = TestBed.get(ServicesappointmentService);
    expect(service).toBeTruthy();
  });
});
