import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCallHistoryComponent } from './lead-call-history.component';

describe('LeadCallHistoryComponent', () => {
  let component: LeadCallHistoryComponent;
  let fixture: ComponentFixture<LeadCallHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadCallHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
