import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassignedresourcepopupComponent } from './addassignedresourcepopup.component';

describe('AddassignedresourcepopupComponent', () => {
  let component: AddassignedresourcepopupComponent;
  let fixture: ComponentFixture<AddassignedresourcepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddassignedresourcepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddassignedresourcepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
