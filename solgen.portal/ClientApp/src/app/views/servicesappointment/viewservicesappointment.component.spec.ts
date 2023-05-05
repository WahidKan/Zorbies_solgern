import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewservicesappointmentComponent } from './viewservicesappointment.component';

describe('ViewservicesappointmentComponent', () => {
  let component: ViewservicesappointmentComponent;
  let fixture: ComponentFixture<ViewservicesappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewservicesappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewservicesappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
