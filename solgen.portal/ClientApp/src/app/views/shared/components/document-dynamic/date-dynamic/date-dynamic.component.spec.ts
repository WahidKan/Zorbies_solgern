import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDynamicComponent } from './date-dynamic.component';

describe('DateDynamicComponent', () => {
  let component: DateDynamicComponent;
  let fixture: ComponentFixture<DateDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
