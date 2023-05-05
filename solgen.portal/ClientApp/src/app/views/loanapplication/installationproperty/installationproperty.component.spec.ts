import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationpropertyComponent } from './installationproperty.component';

describe('InstallationpropertyComponent', () => {
  let component: InstallationpropertyComponent;
  let fixture: ComponentFixture<InstallationpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
