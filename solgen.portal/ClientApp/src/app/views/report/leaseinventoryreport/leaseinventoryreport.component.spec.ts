import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseinventoryreportComponent } from './leaseinventoryreport.component';

describe('LeaseinventoryreportComponent', () => {
  let component: LeaseinventoryreportComponent;
  let fixture: ComponentFixture<LeaseinventoryreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseinventoryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseinventoryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
