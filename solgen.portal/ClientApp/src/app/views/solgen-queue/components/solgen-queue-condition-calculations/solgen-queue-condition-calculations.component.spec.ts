import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueConditionCalculationsComponent } from './solgen-queue-condition-calculations.component';

describe('SolgenQueueConditionCalculationsComponent', () => {
  let component: SolgenQueueConditionCalculationsComponent;
  let fixture: ComponentFixture<SolgenQueueConditionCalculationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueConditionCalculationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueConditionCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
