import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadconfigsettingComponent } from './leadconfigsetting.component';

describe('LeadconfigsettingComponent', () => {
  let component: LeadconfigsettingComponent;
  let fixture: ComponentFixture<LeadconfigsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadconfigsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadconfigsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
