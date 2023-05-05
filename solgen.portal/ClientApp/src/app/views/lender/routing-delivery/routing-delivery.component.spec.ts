import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDeliveryComponent } from './routing-delivery.component';

describe('RoutingDeliveryComponent', () => {
  let component: RoutingDeliveryComponent;
  let fixture: ComponentFixture<RoutingDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
