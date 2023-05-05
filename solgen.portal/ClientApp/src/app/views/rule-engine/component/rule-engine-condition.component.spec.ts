import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEngineConditionComponent } from './rule-engine-condition.component';

describe('RuleEngineConditionComponent', () => {
  let component: RuleEngineConditionComponent;
  let fixture: ComponentFixture<RuleEngineConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleEngineConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEngineConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
