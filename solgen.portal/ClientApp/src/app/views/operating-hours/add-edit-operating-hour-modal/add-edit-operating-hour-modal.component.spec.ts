import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOperatingHourModalComponent } from './add-edit-operating-hour-modal.component';

describe('AddEditOperatingHourModalComponent', () => {
  let component: AddEditOperatingHourModalComponent;
  let fixture: ComponentFixture<AddEditOperatingHourModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOperatingHourModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOperatingHourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
