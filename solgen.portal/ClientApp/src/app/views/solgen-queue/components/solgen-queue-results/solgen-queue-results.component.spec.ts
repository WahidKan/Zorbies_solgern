import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueResultsComponent } from './solgen-queue-results.component';

describe('SolgenQueueResultsComponent', () => {
  let component: SolgenQueueResultsComponent;
  let fixture: ComponentFixture<SolgenQueueResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
