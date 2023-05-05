import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueInputComponent } from './solgen-queue-input.component';

describe('SolgenQueueInputComponent', () => {
  let component: SolgenQueueInputComponent;
  let fixture: ComponentFixture<SolgenQueueInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
