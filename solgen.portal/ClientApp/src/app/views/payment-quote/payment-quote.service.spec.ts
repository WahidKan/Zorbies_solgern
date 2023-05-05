import { TestBed } from '@angular/core/testing';

import { PaymentQuoteService } from './payment-quote.service';

describe('PaymentQuoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentQuoteService = TestBed.get(PaymentQuoteService);
    expect(service).toBeTruthy();
  });
});
