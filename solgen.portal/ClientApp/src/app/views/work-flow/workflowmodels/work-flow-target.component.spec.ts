import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowTargetComponent } from './work-flow-target.component';

describe('WorkFlowTargetComponent', () => {
  let component: WorkFlowTargetComponent;
  let fixture: ComponentFixture<WorkFlowTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
