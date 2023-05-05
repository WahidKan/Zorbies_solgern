import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcheckscoreComponent } from './creditcheckscore.component';

describe('CreditcheckscoreComponent', () => {
  let component: CreditcheckscoreComponent;
  let fixture: ComponentFixture<CreditcheckscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditcheckscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditcheckscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
