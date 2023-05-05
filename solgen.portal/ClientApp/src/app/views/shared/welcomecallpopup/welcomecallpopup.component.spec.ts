import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomecallpopupComponent } from './welcomecallpopup.component';

describe('WelcomecallpopupComponent', () => {
  let component: WelcomecallpopupComponent;
  let fixture: ComponentFixture<WelcomecallpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomecallpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomecallpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
