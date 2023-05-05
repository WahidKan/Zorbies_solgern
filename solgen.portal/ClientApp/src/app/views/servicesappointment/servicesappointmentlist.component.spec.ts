import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesappointmentlistComponent } from './servicesappointmentlist.component';

describe('ServicesappointmentlistComponent', () => {
  let component: ServicesappointmentlistComponent;
  let fixture: ComponentFixture<ServicesappointmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesappointmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesappointmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
