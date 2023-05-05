import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtrackingComponent } from './emailtracking.component';

describe('EmailtrackingComponent', () => {
  let component: EmailtrackingComponent;
  let fixture: ComponentFixture<EmailtrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
