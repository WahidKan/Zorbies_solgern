import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditloanproductComponent } from './addeditloanproduct.component';

describe('AddeditloanproductComponent', () => {
  let component: AddeditloanproductComponent;
  let fixture: ComponentFixture<AddeditloanproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditloanproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditloanproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
