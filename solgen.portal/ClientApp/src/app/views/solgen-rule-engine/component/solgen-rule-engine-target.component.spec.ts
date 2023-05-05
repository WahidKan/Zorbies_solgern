import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineTargetComponent } from './solgen-rule-engine-target.component';

describe('SolgenRuleEngineTargetComponent', () => {
  let component: SolgenRuleEngineTargetComponent;
  let fixture: ComponentFixture<SolgenRuleEngineTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
