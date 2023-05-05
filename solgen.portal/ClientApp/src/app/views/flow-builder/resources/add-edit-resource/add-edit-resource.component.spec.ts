import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditResourceComponent } from './add-edit-resource.component';

describe('AddEditResourceComponent', () => {
  let component: AddEditResourceComponent;
  let fixture: ComponentFixture<AddEditResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
