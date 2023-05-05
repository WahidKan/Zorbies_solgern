import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditleaseComponent } from './addeditlease.component';

describe('AddeditleaseComponent', () => {
  let component: AddeditleaseComponent;
  let fixture: ComponentFixture<AddeditleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
