import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEngineResultComponent } from './rule-engine-result.component';

describe('RuleEngineResultComponent', () => {
  let component: RuleEngineResultComponent;
  let fixture: ComponentFixture<RuleEngineResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleEngineResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEngineResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
