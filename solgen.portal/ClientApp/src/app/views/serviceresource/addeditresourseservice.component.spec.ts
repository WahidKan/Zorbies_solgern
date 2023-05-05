import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditresourseserviceComponent } from './addeditresourseservice.component';

describe('AddeditresourseserviceComponent', () => {
  let component: AddeditresourseserviceComponent;
  let fixture: ComponentFixture<AddeditresourseserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditresourseserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditresourseserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
