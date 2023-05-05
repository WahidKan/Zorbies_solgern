import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerlistComponent } from './trackerlist.component';

describe('TrackerlistComponent', () => {
  let component: TrackerlistComponent;
  let fixture: ComponentFixture<TrackerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
