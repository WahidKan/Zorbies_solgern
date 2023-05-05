import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAnnouncementComponent } from './customer-announcement.component';

describe('CustomerAnnouncementComponent', () => {
  let component: CustomerAnnouncementComponent;
  let fixture: ComponentFixture<CustomerAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
