import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditaccountsComponent } from './addeditaccounts.component';

describe('AddeditaccountsComponent', () => {
  let component: AddeditaccountsComponent;
  let fixture: ComponentFixture<AddeditaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
