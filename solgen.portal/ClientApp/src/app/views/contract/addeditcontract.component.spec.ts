import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditcontractComponent } from './addeditcontract.component';

describe('AddeditcontractComponent', () => {
  let component: AddeditcontractComponent;
  let fixture: ComponentFixture<AddeditcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
