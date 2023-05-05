import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailTestComponent } from './send-email-test.component';

describe('SendEmailTestComponent', () => {
  let component: SendEmailTestComponent;
  let fixture: ComponentFixture<SendEmailTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendEmailTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
