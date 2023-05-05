import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaseStatusComponent } from './update-lease-status.component';

describe('UpdateLeaseStatusComponent', () => {
  let component: UpdateLeaseStatusComponent;
  let fixture: ComponentFixture<UpdateLeaseStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLeaseStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeaseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
