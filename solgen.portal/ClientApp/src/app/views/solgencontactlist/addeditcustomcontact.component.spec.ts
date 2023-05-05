import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditcustomcontactComponent } from './addeditcustomcontact.component';

describe('AddeditcustomcontactComponent', () => {
  let component: AddeditcustomcontactComponent;
  let fixture: ComponentFixture<AddeditcustomcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditcustomcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditcustomcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
