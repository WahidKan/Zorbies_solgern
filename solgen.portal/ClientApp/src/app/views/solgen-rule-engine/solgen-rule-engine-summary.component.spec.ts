import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineSummaryComponent } from './solgen-rule-engine-summary.component';

describe('SolgenRuleEngineSummaryComponent', () => {
  let component: SolgenRuleEngineSummaryComponent;
  let fixture: ComponentFixture<SolgenRuleEngineSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
