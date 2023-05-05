import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingHoursListComponent } from './operating-hours-list.component';

describe('OperatingHoursListComponent', () => {
  let component: OperatingHoursListComponent;
  let fixture: ComponentFixture<OperatingHoursListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingHoursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingHoursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
