import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingHoursViewComponent } from './operating-hours-view.component';

describe('OperatingHoursViewComponent', () => {
  let component: OperatingHoursViewComponent;
  let fixture: ComponentFixture<OperatingHoursViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingHoursViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingHoursViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
