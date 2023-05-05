import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapplicationpopupComponent } from './loanapplicationpopup.component';

describe('LoanapplicationpopupComponent', () => {
  let component: LoanapplicationpopupComponent;
  let fixture: ComponentFixture<LoanapplicationpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanapplicationpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanapplicationpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
