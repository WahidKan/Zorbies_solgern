import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditcontactComponent } from './addeditcontact.component';

describe('AddeditcontactComponent', () => {
  let component: AddeditcontactComponent;
  let fixture: ComponentFixture<AddeditcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
