import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAddEditComponent } from './workflow-add-edit.component';

describe('WorkflowAddEditComponent', () => {
  let component: WorkflowAddEditComponent;
  let fixture: ComponentFixture<WorkflowAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
