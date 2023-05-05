import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPropertiesModalComponent } from './advanced-properties-modal.component';

describe('AdvancedPropertiesModalComponent', () => {
  let component: AdvancedPropertiesModalComponent;
  let fixture: ComponentFixture<AdvancedPropertiesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedPropertiesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedPropertiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
