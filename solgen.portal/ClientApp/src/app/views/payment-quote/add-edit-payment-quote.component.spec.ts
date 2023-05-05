import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPaymentQuoteComponent } from './add-edit-payment-quote.component';

describe('AddEditPaymentQuoteComponent', () => {
  let component: AddEditPaymentQuoteComponent;
  let fixture: ComponentFixture<AddEditPaymentQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPaymentQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPaymentQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
