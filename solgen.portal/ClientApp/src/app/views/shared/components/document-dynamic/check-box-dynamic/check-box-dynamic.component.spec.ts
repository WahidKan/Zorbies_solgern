import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxDynamicComponent } from './check-box-dynamic.component';

describe('CheckBoxDynamicComponent', () => {
  let component: CheckBoxDynamicComponent;
  let fixture: ComponentFixture<CheckBoxDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
