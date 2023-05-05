import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedittaskComponent } from './addedittask.component';

describe('AddedittaskComponent', () => {
  let component: AddedittaskComponent;
  let fixture: ComponentFixture<AddedittaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedittaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedittaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
