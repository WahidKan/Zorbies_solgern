import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountviewdetailComponent } from './accountviewdetail.component';

describe('AccountviewdetailComponent', () => {
  let component: AccountviewdetailComponent;
  let fixture: ComponentFixture<AccountviewdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountviewdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountviewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
