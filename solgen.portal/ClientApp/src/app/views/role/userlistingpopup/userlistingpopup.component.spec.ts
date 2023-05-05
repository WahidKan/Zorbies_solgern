import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListingPopUpComponent } from './userlistingpopup.component';

describe('UserlistingComponent', () => {
  let component: UserListingPopUpComponent;
  let fixture: ComponentFixture<UserListingPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListingPopUpComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListingPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
