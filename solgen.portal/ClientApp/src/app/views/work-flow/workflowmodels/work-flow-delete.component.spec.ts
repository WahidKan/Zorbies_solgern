import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDeleteComponent } from './work-flow-delete.component';

describe('WorkFlowDeleteComponent', () => {
  let component: WorkFlowDeleteComponent;
  let fixture: ComponentFixture<WorkFlowDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
