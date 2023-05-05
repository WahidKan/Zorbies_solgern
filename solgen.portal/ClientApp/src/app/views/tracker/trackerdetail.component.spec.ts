import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerdetailComponent } from './trackerdetail.component';

describe('TrackerdetailComponent', () => {
  let component: TrackerdetailComponent;
  let fixture: ComponentFixture<TrackerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
