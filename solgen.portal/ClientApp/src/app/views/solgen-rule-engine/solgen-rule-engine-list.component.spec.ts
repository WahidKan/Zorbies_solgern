import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineListComponent } from './solgen-rule-engine-list.component';

describe('SolgenRuleEngineListComponent', () => {
  let component: SolgenRuleEngineListComponent;
  let fixture: ComponentFixture<SolgenRuleEngineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
