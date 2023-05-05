import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTypeSelectionComponent } from './flow-type-selection.component';

describe('FlowTypeSelectionComponent', () => {
  let component: FlowTypeSelectionComponent;
  let fixture: ComponentFixture<FlowTypeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowTypeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
