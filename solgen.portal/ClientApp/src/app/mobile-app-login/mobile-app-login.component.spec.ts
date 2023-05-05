import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppLoginComponent } from './mobile-app-login.component';

describe('MobileAppLoginComponent', () => {
  let component: MobileAppLoginComponent;
  let fixture: ComponentFixture<MobileAppLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAppLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
