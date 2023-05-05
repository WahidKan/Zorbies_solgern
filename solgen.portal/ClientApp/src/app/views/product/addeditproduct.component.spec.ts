import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditproductComponent } from './addeditproduct.component';

describe('AddeditproductComponent', () => {
  let component: AddeditproductComponent;
  let fixture: ComponentFixture<AddeditproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
