import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBuilderViewComponent } from './flow-builder-view.component';

describe('FlowBuilderViewComponent', () => {
  let component: FlowBuilderViewComponent;
  let fixture: ComponentFixture<FlowBuilderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowBuilderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowBuilderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
