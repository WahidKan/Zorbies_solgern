import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankapplicantinfoComponent } from './bankapplicantinfo.component';

describe('BankapplicantinfoComponent', () => {
  let component: BankapplicantinfoComponent;
  let fixture: ComponentFixture<BankapplicantinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankapplicantinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankapplicantinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
