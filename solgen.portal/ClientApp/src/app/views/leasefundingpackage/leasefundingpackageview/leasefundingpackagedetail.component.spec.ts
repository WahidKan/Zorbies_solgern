import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasefundingpackagedetailComponent } from './leasefundingpackagedetail.component';

describe('LeasefundingpackagedetailComponent', () => {
  let component: LeasefundingpackagedetailComponent;
  let fixture: ComponentFixture<LeasefundingpackagedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasefundingpackagedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasefundingpackagedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
