import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasecontactdocsComponent } from './leasecontactdocs.component';

describe('LeasecontactdocsComponent', () => {
  let component: LeasecontactdocsComponent;
  let fixture: ComponentFixture<LeasecontactdocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasecontactdocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasecontactdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
