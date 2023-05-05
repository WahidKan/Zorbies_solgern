import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDynamicComponent } from './text-dynamic.component';

describe('TextDynamicComponent', () => {
  let component: TextDynamicComponent;
  let fixture: ComponentFixture<TextDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
