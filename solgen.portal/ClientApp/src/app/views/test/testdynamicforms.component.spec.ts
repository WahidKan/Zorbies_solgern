import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdynamicformsComponent } from './testdynamicforms.component';

describe('TestdynamicformsComponent', () => {
  let component: TestdynamicformsComponent;
  let fixture: ComponentFixture<TestdynamicformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestdynamicformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdynamicformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
