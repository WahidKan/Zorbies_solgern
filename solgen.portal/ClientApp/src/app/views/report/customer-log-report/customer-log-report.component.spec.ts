import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLogReportComponent } from './customer-log-report.component';

describe('CustomerLogReportComponent', () => {
  let component: CustomerLogReportComponent;
  let fixture: ComponentFixture<CustomerLogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
