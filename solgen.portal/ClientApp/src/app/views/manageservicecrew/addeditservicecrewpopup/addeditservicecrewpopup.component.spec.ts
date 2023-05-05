import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditservicecrewpopupComponent } from './addeditservicecrewpopup.component';

describe('AddeditservicecrewpopupComponent', () => {
  let component: AddeditservicecrewpopupComponent;
  let fixture: ComponentFixture<AddeditservicecrewpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditservicecrewpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditservicecrewpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
