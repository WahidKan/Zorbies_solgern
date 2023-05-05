import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignListingComponent } from './campaign-listing.component';

describe('CampaignListingComponent', () => {
  let component: CampaignListingComponent;
  let fixture: ComponentFixture<CampaignListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
