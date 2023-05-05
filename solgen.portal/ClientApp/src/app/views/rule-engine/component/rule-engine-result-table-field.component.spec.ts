import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEngineResultTableFieldComponent } from './rule-engine-result-table-field.component';

describe('RuleEngineResultTableFieldComponent', () => {
  let component: RuleEngineResultTableFieldComponent;
  let fixture: ComponentFixture<RuleEngineResultTableFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleEngineResultTableFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEngineResultTableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
