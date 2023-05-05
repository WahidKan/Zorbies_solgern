import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPropertiesModalDynamicComponent } from './advanced-properties-modal-dynamic.component';

describe('AdvancedPropertiesModalDynamicComponent', () => {
  let component: AdvancedPropertiesModalDynamicComponent;
  let fixture: ComponentFixture<AdvancedPropertiesModalDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedPropertiesModalDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedPropertiesModalDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
