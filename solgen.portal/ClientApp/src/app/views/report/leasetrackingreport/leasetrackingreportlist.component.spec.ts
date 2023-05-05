import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasetrackingreportlistComponent } from './leasetrackingreportlist.component';

describe('LeasetrackingreportlistComponent', () => {
  let component: LeasetrackingreportlistComponent;
  let fixture: ComponentFixture<LeasetrackingreportlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasetrackingreportlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasetrackingreportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
