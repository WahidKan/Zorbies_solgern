import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableDraggableDynamicComponent } from './resizable-draggable-dynamic.component';

describe('ResizableDraggableDynamicComponent', () => {
  let component: ResizableDraggableDynamicComponent;
  let fixture: ComponentFixture<ResizableDraggableDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizableDraggableDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizableDraggableDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
