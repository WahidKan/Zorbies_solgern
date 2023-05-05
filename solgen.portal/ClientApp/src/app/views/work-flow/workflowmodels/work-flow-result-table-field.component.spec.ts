import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowResultTableFieldComponent } from './work-flow-result-table-field.component';

describe('WorkFlowResultTableFieldComponent', () => {
  let component: WorkFlowResultTableFieldComponent;
  let fixture: ComponentFixture<WorkFlowResultTableFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowResultTableFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowResultTableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
