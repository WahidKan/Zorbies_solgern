import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditleaserequestComponent } from './addeditleaserequest.component';

describe('AddeditleaserequestComponent', () => {
  let component: AddeditleaserequestComponent;
  let fixture: ComponentFixture<AddeditleaserequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditleaserequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditleaserequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
