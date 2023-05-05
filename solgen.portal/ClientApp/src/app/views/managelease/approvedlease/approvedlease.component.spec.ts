import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedleaseComponent } from './approvedlease.component';

describe('ApprovedleaseComponent', () => {
  let component: ApprovedleaseComponent;
  let fixture: ComponentFixture<ApprovedleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
