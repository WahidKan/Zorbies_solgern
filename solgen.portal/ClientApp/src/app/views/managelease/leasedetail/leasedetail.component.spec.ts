import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasedetailComponent } from './leasedetail.component';

describe('LeasedetailComponent', () => {
  let component: LeasedetailComponent;
  let fixture: ComponentFixture<LeasedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
