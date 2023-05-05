import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricebookassociateproductComponent } from './pricebookassociateproduct.component';

describe('PricebookassociateproductComponent', () => {
  let component: PricebookassociateproductComponent;
  let fixture: ComponentFixture<PricebookassociateproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricebookassociateproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricebookassociateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
