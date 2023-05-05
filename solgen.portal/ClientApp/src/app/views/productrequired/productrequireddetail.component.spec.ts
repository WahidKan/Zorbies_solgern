import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductrequireddetailComponent } from './productrequireddetail.component';

describe('ProductrequireddetailComponent', () => {
  let component: ProductrequireddetailComponent;
  let fixture: ComponentFixture<ProductrequireddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductrequireddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductrequireddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
