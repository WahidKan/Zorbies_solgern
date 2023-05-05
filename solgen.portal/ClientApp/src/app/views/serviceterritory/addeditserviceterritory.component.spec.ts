import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditserviceterritoryComponent } from './addeditserviceterritory.component';

describe('AddeditserviceterritoryComponent', () => {
  let component: AddeditserviceterritoryComponent;
  let fixture: ComponentFixture<AddeditserviceterritoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditserviceterritoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditserviceterritoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
