import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenExecutionComponent } from './screen-execution.component';

describe('ScreenExecutionComponent', () => {
  let component: ScreenExecutionComponent;
  let fixture: ComponentFixture<ScreenExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
