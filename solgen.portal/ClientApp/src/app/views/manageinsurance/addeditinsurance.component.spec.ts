import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditinsuranceComponent } from './addeditinsurance.component';

describe('AddeditinsuranceComponent', () => {
  let component: AddeditinsuranceComponent;
  let fixture: ComponentFixture<AddeditinsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditinsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditinsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
