import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditservicesappointmentComponent } from './addeditservicesappointment.component';

describe('AddeditservicesappointmentComponent', () => {
  let component: AddeditservicesappointmentComponent;
  let fixture: ComponentFixture<AddeditservicesappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditservicesappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditservicesappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
