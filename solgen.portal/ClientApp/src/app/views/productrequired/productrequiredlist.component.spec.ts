import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductrequiredlistComponent } from './productrequiredlist.component';

describe('ProductrequiredlistComponent', () => {
  let component: ProductrequiredlistComponent;
  let fixture: ComponentFixture<ProductrequiredlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductrequiredlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductrequiredlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
