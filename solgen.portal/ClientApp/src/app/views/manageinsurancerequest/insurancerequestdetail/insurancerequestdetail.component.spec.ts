import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancerequestdetailComponent } from './insurancerequestdetail.component';

describe('InsurancerequestdetailComponent', () => {
  let component: InsurancerequestdetailComponent;
  let fixture: ComponentFixture<InsurancerequestdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancerequestdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancerequestdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
