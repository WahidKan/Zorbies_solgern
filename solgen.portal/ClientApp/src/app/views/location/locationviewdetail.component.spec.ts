import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationviewdetailComponent } from './locationviewdetail.component';

describe('LocationviewdetailComponent', () => {
  let component: LocationviewdetailComponent;
  let fixture: ComponentFixture<LocationviewdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationviewdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationviewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
