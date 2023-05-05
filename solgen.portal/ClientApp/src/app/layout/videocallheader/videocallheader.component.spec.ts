import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallheaderComponent } from './videocallheader.component';

describe('VideocallheaderComponent', () => {
  let component: VideocallheaderComponent;
  let fixture: ComponentFixture<VideocallheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocallheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideocallheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
