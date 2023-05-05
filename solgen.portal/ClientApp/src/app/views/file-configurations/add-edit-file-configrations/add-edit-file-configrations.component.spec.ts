import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFileConfigrationsComponent } from './add-edit-file-configrations.component';

describe('AddEditFileConfigrationsComponent', () => {
  let component: AddEditFileConfigrationsComponent;
  let fixture: ComponentFixture<AddEditFileConfigrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditFileConfigrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFileConfigrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
