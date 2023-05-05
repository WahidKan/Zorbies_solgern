import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDynamicComponent } from './video-dynamic.component';

describe('VideoDynamicComponent', () => {
  let component: VideoDynamicComponent;
  let fixture: ComponentFixture<VideoDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
