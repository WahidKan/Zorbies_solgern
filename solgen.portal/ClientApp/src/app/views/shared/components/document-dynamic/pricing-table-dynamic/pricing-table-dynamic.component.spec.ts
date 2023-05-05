import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingTableDynamicComponent } from './pricing-table-dynamic.component';

describe('PricingTableDynamicComponent', () => {
  let component: PricingTableDynamicComponent;
  let fixture: ComponentFixture<PricingTableDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingTableDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingTableDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
