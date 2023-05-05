import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDynamicComponent } from './image-dynamic.component';

describe('ImageDynamicComponent', () => {
  let component: ImageDynamicComponent;
  let fixture: ComponentFixture<ImageDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
