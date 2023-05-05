import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomToolBarDynamicComponent } from './custom-tool-bar-dynamic.component';

describe('CustomToolBarDynamicComponent', () => {
  let component: CustomToolBarDynamicComponent;
  let fixture: ComponentFixture<CustomToolBarDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomToolBarDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomToolBarDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
