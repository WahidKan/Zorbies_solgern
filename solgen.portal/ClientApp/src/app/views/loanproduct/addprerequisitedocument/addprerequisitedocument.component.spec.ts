import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprerequisitedocumentComponent } from './addprerequisitedocument.component';

describe('AddprerequisitedocumentComponent', () => {
  let component: AddprerequisitedocumentComponent;
  let fixture: ComponentFixture<AddprerequisitedocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprerequisitedocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprerequisitedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
