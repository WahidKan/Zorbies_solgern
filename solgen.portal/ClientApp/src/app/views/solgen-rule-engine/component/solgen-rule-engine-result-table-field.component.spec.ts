import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineResultTableFieldComponent } from './solgen-rule-engine-result-table-field.component';

describe('SolgenRuleEngineResultTableFieldComponent', () => {
  let component: SolgenRuleEngineResultTableFieldComponent;
  let fixture: ComponentFixture<SolgenRuleEngineResultTableFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineResultTableFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineResultTableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
