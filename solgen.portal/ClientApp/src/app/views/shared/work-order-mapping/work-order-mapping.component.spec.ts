import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderMappingComponent } from './work-order-mapping.component';

describe('WorkOrderMappingComponent', () => {
  let component: WorkOrderMappingComponent;
  let fixture: ComponentFixture<WorkOrderMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
