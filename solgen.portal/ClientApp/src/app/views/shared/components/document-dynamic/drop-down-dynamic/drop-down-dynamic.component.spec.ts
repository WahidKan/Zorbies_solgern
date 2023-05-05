import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownDynamicComponent } from './drop-down-dynamic.component';

describe('DropDownDynamicComponent', () => {
  let component: DropDownDynamicComponent;
  let fixture: ComponentFixture<DropDownDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
