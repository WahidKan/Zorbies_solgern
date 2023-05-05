import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropDynamicComponent } from './drag-drop-dynamic.component';

describe('DragDropDynamicComponent', () => {
  let component: DragDropDynamicComponent;
  let fixture: ComponentFixture<DragDropDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
