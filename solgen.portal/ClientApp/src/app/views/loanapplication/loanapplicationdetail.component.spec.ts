import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapplicationdetailComponent } from './loanapplicationdetail.component';

describe('LoanapplicationdetailComponent', () => {
  let component: LoanapplicationdetailComponent;
  let fixture: ComponentFixture<LoanapplicationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanapplicationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanapplicationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
