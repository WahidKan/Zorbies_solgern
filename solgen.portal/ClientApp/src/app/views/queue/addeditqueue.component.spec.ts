import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditqueueComponent } from './addeditqueue.component';

describe('AddeditqueueComponent', () => {
  let component: AddeditqueueComponent;
  let fixture: ComponentFixture<AddeditqueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditqueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditqueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
