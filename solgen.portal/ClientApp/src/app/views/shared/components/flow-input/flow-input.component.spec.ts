import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowInputComponent } from './flow-input.component';

describe('FlowInputComponent', () => {
  let component: FlowInputComponent;
  let fixture: ComponentFixture<FlowInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
