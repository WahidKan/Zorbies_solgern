import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueListComponent } from './solgen-queue-list.component';

describe('SolgenQueueListComponent', () => {
  let component: SolgenQueueListComponent;
  let fixture: ComponentFixture<SolgenQueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
