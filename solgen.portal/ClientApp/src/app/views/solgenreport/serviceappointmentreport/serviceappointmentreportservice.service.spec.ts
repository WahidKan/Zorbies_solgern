import { TestBed } from '@angular/core/testing';
import { ServiceappointmentreportserviceService } from './serviceappointmentreportservice.service';
describe('NestreportserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: ServiceappointmentreportserviceService = TestBed.get(ServiceappointmentreportserviceService);
    expect(service).toBeTruthy();
  });
});
