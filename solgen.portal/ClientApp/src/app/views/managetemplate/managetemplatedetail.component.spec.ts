import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetemplatedetailComponent } from './managetemplatedetail.component';

describe('ManagetemplatedetailComponent', () => {
  let component: ManagetemplatedetailComponent;
  let fixture: ComponentFixture<ManagetemplatedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetemplatedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetemplatedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
