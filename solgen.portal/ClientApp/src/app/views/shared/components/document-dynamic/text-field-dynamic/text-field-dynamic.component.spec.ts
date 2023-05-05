import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldDynamicComponent } from './text-field-dynamic.component';

describe('TextFieldDynamicComponent', () => {
  let component: TextFieldDynamicComponent;
  let fixture: ComponentFixture<TextFieldDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFieldDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
