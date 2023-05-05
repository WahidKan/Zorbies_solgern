import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleEngineAddOrEditComponent } from './solgen-rule-engine-add-or-edit.component';

describe('SolgenRuleEngineAddOrEditComponent', () => {
  let component: SolgenRuleEngineAddOrEditComponent;
  let fixture: ComponentFixture<SolgenRuleEngineAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleEngineAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleEngineAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
