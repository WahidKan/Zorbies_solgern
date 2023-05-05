import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentQuoteListComponent } from './payment-quote-list.component';

describe('PaymentQuoteListComponent', () => {
  let component: PaymentQuoteListComponent;
  let fixture: ComponentFixture<PaymentQuoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentQuoteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentQuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
