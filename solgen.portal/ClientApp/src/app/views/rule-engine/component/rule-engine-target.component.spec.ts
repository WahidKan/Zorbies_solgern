import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEngineTargetComponent } from './rule-engine-target.component';

describe('RuleEngineTargetComponent', () => {
  let component: RuleEngineTargetComponent;
  let fixture: ComponentFixture<RuleEngineTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleEngineTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEngineTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
