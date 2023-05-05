import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasefundingpackagelistComponent } from './leasefundingpackagelist.component';

describe('LeasefundingpackagelistComponent', () => {
  let component: LeasefundingpackagelistComponent;
  let fixture: ComponentFixture<LeasefundingpackagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasefundingpackagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasefundingpackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
