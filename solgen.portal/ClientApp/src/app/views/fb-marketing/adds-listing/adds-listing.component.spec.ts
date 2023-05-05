import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsListingComponent } from './adds-listing.component';

describe('AddsListingComponent', () => {
  let component: AddsListingComponent;
  let fixture: ComponentFixture<AddsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
