import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancerequestlistComponent } from './insurancerequestlist.component';

describe('InsurancerequestlistComponent', () => {
  let component: InsurancerequestlistComponent;
  let fixture: ComponentFixture<InsurancerequestlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancerequestlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancerequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
