import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueConditionsComponent } from './solgen-queue-conditions.component';

describe('SolgenQueueConditionsComponent', () => {
  let component: SolgenQueueConditionsComponent;
  let fixture: ComponentFixture<SolgenQueueConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
