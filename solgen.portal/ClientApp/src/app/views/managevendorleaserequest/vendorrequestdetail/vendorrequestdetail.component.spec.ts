import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorrequestdetailComponent } from './vendorrequestdetail.component';

describe('VendorrequestdetailComponent', () => {
  let component: VendorrequestdetailComponent;
  let fixture: ComponentFixture<VendorrequestdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorrequestdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorrequestdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
