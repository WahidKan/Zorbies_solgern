import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderLineItemPopupComponent } from './work-order-line-item-popup.component';

describe('WorkOrderLineItemPopupComponent', () => {
  let component: WorkOrderLineItemPopupComponent;
  let fixture: ComponentFixture<WorkOrderLineItemPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderLineItemPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderLineItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
