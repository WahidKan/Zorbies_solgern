import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallandardetailComponent } from './callandardetail.component';

describe('CallandardetailComponent', () => {
  let component: CallandardetailComponent;
  let fixture: ComponentFixture<CallandardetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallandardetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallandardetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
