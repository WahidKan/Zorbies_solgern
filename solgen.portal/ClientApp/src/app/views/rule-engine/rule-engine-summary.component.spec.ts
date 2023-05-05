import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEngineSummaryComponent } from './rule-engine-summary.component';

describe('RuleEngineSummaryComponent', () => {
  let component: RuleEngineSummaryComponent;
  let fixture: ComponentFixture<RuleEngineSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleEngineSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEngineSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
