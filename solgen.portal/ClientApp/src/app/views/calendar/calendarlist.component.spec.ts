import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarListComponent } from './calendarlist.component';

describe('CalendarlistComponent', () => {
  let component: CalendarListComponent;
  let fixture: ComponentFixture<CalendarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
