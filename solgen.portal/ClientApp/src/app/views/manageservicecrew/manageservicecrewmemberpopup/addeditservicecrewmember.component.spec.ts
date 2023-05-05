import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditservicecrewmemberComponent } from './addeditservicecrewmember.component';

describe('AddeditservicecrewmemberComponent', () => {
  let component: AddeditservicecrewmemberComponent;
  let fixture: ComponentFixture<AddeditservicecrewmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditservicecrewmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditservicecrewmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
