import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadconvertpopupComponent } from './leadconvertpopup.component';

describe('LeadconvertpopupComponent', () => {
  let component: LeadconvertpopupComponent;
  let fixture: ComponentFixture<LeadconvertpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadconvertpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadconvertpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
