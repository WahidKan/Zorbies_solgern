import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapplicationpendingdocumentComponent } from './loanapplicationpendingdocument.component';

describe('LoanapplicationpendingdocumentComponent', () => {
  let component: LoanapplicationpendingdocumentComponent;
  let fixture: ComponentFixture<LoanapplicationpendingdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanapplicationpendingdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanapplicationpendingdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
