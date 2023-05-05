import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapplicationlistComponent } from './loanapplicationlist.component';

describe('LoanapplicationlistComponent', () => {
  let component: LoanapplicationlistComponent;
  let fixture: ComponentFixture<LoanapplicationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanapplicationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanapplicationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
