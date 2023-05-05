import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmailpopupComponent } from './sendmailpopup.component';

describe('SendmailpopupComponent', () => {
  let component: SendmailpopupComponent;
  let fixture: ComponentFixture<SendmailpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendmailpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmailpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
