import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancetrackingComponent } from './insurancetracking.component';

describe('InsurancetrackingComponent', () => {
  let component: InsurancetrackingComponent;
  let fixture: ComponentFixture<InsurancetrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancetrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancetrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
