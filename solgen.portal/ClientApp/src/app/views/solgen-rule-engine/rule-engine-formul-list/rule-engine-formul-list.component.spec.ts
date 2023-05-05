import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEngineFormulListComponent } from './rule-engine-formul-list.component';

describe('RuleEngineFormulListComponent', () => {
  let component: RuleEngineFormulListComponent;
  let fixture: ComponentFixture<RuleEngineFormulListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleEngineFormulListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEngineFormulListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
