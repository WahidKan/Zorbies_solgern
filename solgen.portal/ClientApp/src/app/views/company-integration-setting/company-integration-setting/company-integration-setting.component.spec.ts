import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyIntegrationSettingComponent } from './company-integration-setting.component';

describe('CompanyIntegrationSettingComponent', () => {
  let component: CompanyIntegrationSettingComponent;
  let fixture: ComponentFixture<CompanyIntegrationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyIntegrationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyIntegrationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
