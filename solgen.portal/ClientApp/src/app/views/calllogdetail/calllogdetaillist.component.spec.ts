import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalllogdetaillistComponent } from './calllogdetaillist.component';

describe('CalllogdetaillistComponent', () => {
  let component: CalllogdetaillistComponent;
  let fixture: ComponentFixture<CalllogdetaillistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalllogdetaillistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalllogdetaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
