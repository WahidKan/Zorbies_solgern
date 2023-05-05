import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowResultComponent } from './work-flow-result.component';

describe('WorkFlowResultComponent', () => {
  let component: WorkFlowResultComponent;
  let fixture: ComponentFixture<WorkFlowResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
