import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationtypelistComponent } from './locationtypelist.component';

describe('LocationtypelistComponent', () => {
  let component: LocationtypelistComponent;
  let fixture: ComponentFixture<LocationtypelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationtypelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationtypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
