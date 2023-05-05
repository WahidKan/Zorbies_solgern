import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankverificationComponent } from './bankverification.component';

describe('BankverificationComponent', () => {
  let component: BankverificationComponent;
  let fixture: ComponentFixture<BankverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
