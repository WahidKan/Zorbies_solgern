import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePriorityPopupComponent } from './zone-priority-popup.component';

describe('ZonePriorityPopupComponent', () => {
  let component: ZonePriorityPopupComponent;
  let fixture: ComponentFixture<ZonePriorityPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonePriorityPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePriorityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
