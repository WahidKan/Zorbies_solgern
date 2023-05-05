import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoapplicantdetailComponent } from './coapplicantdetail.component';

describe('CoapplicantdetailComponent', () => {
  let component: CoapplicantdetailComponent;
  let fixture: ComponentFixture<CoapplicantdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoapplicantdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoapplicantdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
