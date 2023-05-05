import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginuserlistComponent } from './loginuserlist.component';

describe('LoginuserlistComponent', () => {
  let component: LoginuserlistComponent;
  let fixture: ComponentFixture<LoginuserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginuserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
