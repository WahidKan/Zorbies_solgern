import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditcustomreportComponent } from './addeditcustomreport.component';

describe('AddeditcustomreportComponent', () => {
  let component: AddeditcustomreportComponent;
  let fixture: ComponentFixture<AddeditcustomreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditcustomreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditcustomreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
