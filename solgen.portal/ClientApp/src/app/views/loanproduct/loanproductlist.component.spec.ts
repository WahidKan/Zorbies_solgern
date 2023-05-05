import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanproductlistComponent } from './loanproductlist.component';

describe('LoanproductlistComponent', () => {
  let component: LoanproductlistComponent;
  let fixture: ComponentFixture<LoanproductlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanproductlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanproductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
