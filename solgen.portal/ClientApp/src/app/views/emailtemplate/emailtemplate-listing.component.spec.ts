import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtemplateListingComponent } from './emailtemplate-listing.component';

describe('EmailtemplateListingComponent', () => {
  let component: EmailtemplateListingComponent;
  let fixture: ComponentFixture<EmailtemplateListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtemplateListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtemplateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
