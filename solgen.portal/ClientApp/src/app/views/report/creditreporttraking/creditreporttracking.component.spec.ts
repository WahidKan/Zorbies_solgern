import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditreporttrackingComponent } from './creditreporttracking.component';

describe('CreditreporttrackingComponent', () => {
  let component: CreditreporttrackingComponent;
  let fixture: ComponentFixture<CreditreporttrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditreporttrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditreporttrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
