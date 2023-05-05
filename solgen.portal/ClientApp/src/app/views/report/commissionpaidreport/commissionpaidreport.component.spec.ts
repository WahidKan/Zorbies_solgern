import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionpaidreportComponent } from './commissionpaidreport.component';

describe('CommissionpaidreportComponent', () => {
  let component: CommissionpaidreportComponent;
  let fixture: ComponentFixture<CommissionpaidreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionpaidreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionpaidreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
