import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowResultCalculationComponent } from './work-flow-result-calculation.component';

describe('WorkFlowResultCalculationComponent', () => {
  let component: WorkFlowResultCalculationComponent;
  let fixture: ComponentFixture<WorkFlowResultCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowResultCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowResultCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
