import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDescisionComponent } from './work-flow-descision.component';

describe('WorkFlowDescisionComponent', () => {
  let component: WorkFlowDescisionComponent;
  let fixture: ComponentFixture<WorkFlowDescisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowDescisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDescisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
