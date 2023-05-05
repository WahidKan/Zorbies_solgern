import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationFlowListComponent } from './automation-flow-list.component';

describe('AutomationFlowListComponent', () => {
  let component: AutomationFlowListComponent;
  let fixture: ComponentFixture<AutomationFlowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationFlowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationFlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
