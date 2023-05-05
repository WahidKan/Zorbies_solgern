import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasetemplatedetailComponent } from './leasetemplatedetail.component';

describe('LeasetemplatedetailComponent', () => {
  let component: LeasetemplatedetailComponent;
  let fixture: ComponentFixture<LeasetemplatedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasetemplatedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasetemplatedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
