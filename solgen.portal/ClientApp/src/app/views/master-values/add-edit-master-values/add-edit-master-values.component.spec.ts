import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMasterValuesComponent } from './add-edit-master-values.component';

describe('AddEditMasterValuesComponent', () => {
  let component: AddEditMasterValuesComponent;
  let fixture: ComponentFixture<AddEditMasterValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditMasterValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMasterValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
