import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxModelDynamicComponent } from './box-model-dynamic.component';

describe('BoxModelDynamicComponent', () => {
  let component: BoxModelDynamicComponent;
  let fixture: ComponentFixture<BoxModelDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxModelDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxModelDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
