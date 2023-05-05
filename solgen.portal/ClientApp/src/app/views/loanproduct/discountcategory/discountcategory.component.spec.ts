import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountcategoryComponent } from './discountcategory.component';

describe('DiscountcategoryComponent', () => {
  let component: DiscountcategoryComponent;
  let fixture: ComponentFixture<DiscountcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
