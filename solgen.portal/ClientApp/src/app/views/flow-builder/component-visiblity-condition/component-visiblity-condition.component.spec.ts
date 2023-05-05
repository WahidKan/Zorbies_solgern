import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentVisiblityConditionComponent } from './component-visiblity-condition.component';

describe('ComponentVisiblityConditionComponent', () => {
  let component: ComponentVisiblityConditionComponent;
  let fixture: ComponentFixture<ComponentVisiblityConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentVisiblityConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentVisiblityConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
