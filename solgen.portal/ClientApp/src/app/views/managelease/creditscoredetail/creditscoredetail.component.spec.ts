import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditscoredetailComponent } from './creditscoredetail.component';

describe('CreditscoredetailComponent', () => {
  let component: CreditscoredetailComponent;
  let fixture: ComponentFixture<CreditscoredetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditscoredetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditscoredetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
