import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomepackagetrackingreportComponent } from './welcomepackagetrackingreport.component';

describe('WelcomepackagetrackingreportComponent', () => {
  let component: WelcomepackagetrackingreportComponent;
  let fixture: ComponentFixture<WelcomepackagetrackingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomepackagetrackingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomepackagetrackingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
