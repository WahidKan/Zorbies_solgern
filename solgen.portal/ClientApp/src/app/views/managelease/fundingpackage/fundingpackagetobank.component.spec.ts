import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingpackagetobankComponent } from './fundingpackagetobank.component';

describe('FundingpackagetobankComponent', () => {
  let component: FundingpackagetobankComponent;
  let fixture: ComponentFixture<FundingpackagetobankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingpackagetobankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingpackagetobankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
