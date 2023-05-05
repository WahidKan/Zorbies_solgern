import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlenderComponent } from './addlender.component';

describe('AddlenderComponent', () => {
  let component: AddlenderComponent;
  let fixture: ComponentFixture<AddlenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
