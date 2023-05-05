import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineResultComponent } from './solgen-rule-engine-result.component';

describe('SolgenRuleEngineResultComponent', () => {
  let component: SolgenRuleEngineResultComponent;
  let fixture: ComponentFixture<SolgenRuleEngineResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
