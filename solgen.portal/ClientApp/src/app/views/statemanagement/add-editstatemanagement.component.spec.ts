import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditstatemanagementComponent } from './add-editstatemanagement.component';

describe('AddEditstatemanagementComponent', () => {
  let component: AddEditstatemanagementComponent;
  let fixture: ComponentFixture<AddEditstatemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditstatemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditstatemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
