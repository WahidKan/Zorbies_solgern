import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenAddEditQueueComponent } from './solgen-add-edit-queue.component';

describe('SolgenAddEditQueueComponent', () => {
  let component: SolgenAddEditQueueComponent;
  let fixture: ComponentFixture<SolgenAddEditQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenAddEditQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenAddEditQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
