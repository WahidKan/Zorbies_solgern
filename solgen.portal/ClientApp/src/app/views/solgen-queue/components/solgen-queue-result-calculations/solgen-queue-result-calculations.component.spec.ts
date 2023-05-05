import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueResultCalculationsComponent } from './solgen-queue-result-calculations.component';

describe('SolgenQueueResultCalculationsComponent', () => {
  let component: SolgenQueueResultCalculationsComponent;
  let fixture: ComponentFixture<SolgenQueueResultCalculationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueResultCalculationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueResultCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
