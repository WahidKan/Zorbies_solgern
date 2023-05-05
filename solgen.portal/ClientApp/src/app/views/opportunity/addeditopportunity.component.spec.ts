import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditopportunityComponent } from './addeditopportunity.component';

describe('AddeditopportunityComponent', () => {
  let component: AddeditopportunityComponent;
  let fixture: ComponentFixture<AddeditopportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditopportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditopportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
