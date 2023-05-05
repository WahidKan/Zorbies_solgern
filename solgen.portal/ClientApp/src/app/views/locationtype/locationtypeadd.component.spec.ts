import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationtypeaddComponent } from './locationtypeadd.component';

describe('LocationtypeaddComponent', () => {
  let component: LocationtypeaddComponent;
  let fixture: ComponentFixture<LocationtypeaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationtypeaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationtypeaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
