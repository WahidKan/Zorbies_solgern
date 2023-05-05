import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRuleEngineListComponent } from './setting-rule-engine-list.component';

describe('SettingRuleEngineListComponent', () => {
  let component: SettingRuleEngineListComponent;
  let fixture: ComponentFixture<SettingRuleEngineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRuleEngineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRuleEngineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
