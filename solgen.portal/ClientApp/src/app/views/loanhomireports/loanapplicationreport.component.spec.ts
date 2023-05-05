import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapplicationreportComponent } from './loanapplicationreport.component';

describe('LoanapplicationreportComponent', () => {
  let component: LoanapplicationreportComponent;
  let fixture: ComponentFixture<LoanapplicationreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanapplicationreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanapplicationreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
