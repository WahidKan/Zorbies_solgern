import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueTargetComponent } from './solgen-queue-target.component';

describe('SolgenQueueTargetComponent', () => {
  let component: SolgenQueueTargetComponent;
  let fixture: ComponentFixture<SolgenQueueTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
