import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseFundingStatusDetailComponent } from './lease-funding-status-detail.component';

describe('LeaseFundingStatusDetailComponent', () => {
  let component: LeaseFundingStatusDetailComponent;
  let fixture: ComponentFixture<LeaseFundingStatusDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseFundingStatusDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseFundingStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
