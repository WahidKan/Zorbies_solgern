import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEngineListComponent } from './rule-engine-list.component';

describe('RuleEngineListComponent', () => {
  let component: RuleEngineListComponent;
  let fixture: ComponentFixture<RuleEngineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleEngineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEngineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
