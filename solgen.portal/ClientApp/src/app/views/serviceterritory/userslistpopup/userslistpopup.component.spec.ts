import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserslistpopupComponent } from './userslistpopup.component';

describe('UserslistpopupComponent', () => {
  let component: UserslistpopupComponent;
  let fixture: ComponentFixture<UserslistpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserslistpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserslistpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
