import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InprogressleaseComponent } from './inprogresslease.component';

describe('InprogressleaseComponent', () => {
  let component: InprogressleaseComponent;
  let fixture: ComponentFixture<InprogressleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InprogressleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InprogressleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
