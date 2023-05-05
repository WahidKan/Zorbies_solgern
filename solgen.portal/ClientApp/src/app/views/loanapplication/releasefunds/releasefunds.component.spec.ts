import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasefundsComponent } from './releasefunds.component';

describe('ReleasefundsComponent', () => {
  let component: ReleasefundsComponent;
  let fixture: ComponentFixture<ReleasefundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasefundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
