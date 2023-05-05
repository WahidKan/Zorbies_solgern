import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedLoanApplicationComponent } from './completed-loan-application.component';

describe('CompletedLoanApplicationComponent', () => {
  let component: CompletedLoanApplicationComponent;
  let fixture: ComponentFixture<CompletedLoanApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedLoanApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedLoanApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
