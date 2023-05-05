import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineConditionComponent } from './solgen-rule-engine-condition.component';

describe('SolgenRuleEngineConditionComponent', () => {
  let component: SolgenRuleEngineConditionComponent;
  let fixture: ComponentFixture<SolgenRuleEngineConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
