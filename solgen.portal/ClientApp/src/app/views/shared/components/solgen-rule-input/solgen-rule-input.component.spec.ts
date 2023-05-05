import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenRuleInputComponent } from './solgen-rule-input.component';

describe('SolgenRuleInputComponent', () => {
  let component: SolgenRuleInputComponent;
  let fixture: ComponentFixture<SolgenRuleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenRuleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenRuleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
