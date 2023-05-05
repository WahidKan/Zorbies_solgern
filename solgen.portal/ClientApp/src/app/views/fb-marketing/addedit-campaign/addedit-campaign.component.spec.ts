import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditCampaignComponent } from './addedit-campaign.component';

describe('AddeditCampaignComponent', () => {
  let component: AddeditCampaignComponent;
  let fixture: ComponentFixture<AddeditCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
