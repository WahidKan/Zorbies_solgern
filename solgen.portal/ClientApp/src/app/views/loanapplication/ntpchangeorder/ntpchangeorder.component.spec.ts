import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NtpchangeorderComponent } from './ntpchangeorder.component';

describe('NtpchangeorderComponent', () => {
  let component: NtpchangeorderComponent;
  let fixture: ComponentFixture<NtpchangeorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NtpchangeorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NtpchangeorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
