import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseapproveforpurchasedetailComponent } from './leaseapproveforpurchasedetail.component';

describe('LeaseapproveforpurchasedetailComponent', () => {
  let component: LeaseapproveforpurchasedetailComponent;
  let fixture: ComponentFixture<LeaseapproveforpurchasedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseapproveforpurchasedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseapproveforpurchasedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
