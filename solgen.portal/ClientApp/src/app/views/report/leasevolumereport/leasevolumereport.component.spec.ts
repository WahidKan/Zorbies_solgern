import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasevolumereportComponent } from './leasevolumereport.component';

describe('LeasevolumereportComponent', () => {
  let component: LeasevolumereportComponent;
  let fixture: ComponentFixture<LeasevolumereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasevolumereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasevolumereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
