import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowConditionComponent } from './work-flow-condition.component';

describe('WorkFlowConditionComponent', () => {
  let component: WorkFlowConditionComponent;
  let fixture: ComponentFixture<WorkFlowConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
