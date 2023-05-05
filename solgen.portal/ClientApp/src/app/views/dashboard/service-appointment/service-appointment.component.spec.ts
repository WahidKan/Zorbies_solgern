import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAppointmentComponent } from './service-appointment.component';

describe('ServiceAppointmentComponent', () => {
  let component: ServiceAppointmentComponent;
  let fixture: ComponentFixture<ServiceAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
