import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowAutomationInputComponent } from './flow-automation-input.component';

describe('FlowAutomationInputComponent', () => {
  let component: FlowAutomationInputComponent;
  let fixture: ComponentFixture<FlowAutomationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowAutomationInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowAutomationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
