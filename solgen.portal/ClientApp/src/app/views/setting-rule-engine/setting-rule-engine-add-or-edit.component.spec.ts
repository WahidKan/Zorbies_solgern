import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRuleEngineAddOrEditComponent } from './setting-rule-engine-add-or-edit.component';

describe('SettingRuleEngineAddOrEditComponent', () => {
  let component: SettingRuleEngineAddOrEditComponent;
  let fixture: ComponentFixture<SettingRuleEngineAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRuleEngineAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRuleEngineAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
