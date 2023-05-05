import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAnnouncementListComponent } from './customer-announcement-list.component';

describe('CustomerAnnouncementListComponent', () => {
  let component: CustomerAnnouncementListComponent;
  let fixture: ComponentFixture<CustomerAnnouncementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAnnouncementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAnnouncementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
