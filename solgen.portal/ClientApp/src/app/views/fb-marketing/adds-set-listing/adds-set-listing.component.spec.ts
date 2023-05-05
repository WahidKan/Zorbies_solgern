import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsSetListingComponent } from './adds-set-listing.component';

describe('AddsSetListingComponent', () => {
  let component: AddsSetListingComponent;
  let fixture: ComponentFixture<AddsSetListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsSetListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsSetListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
