import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueCustomFormulaComponent } from './solgen-queue-custom-formula.component';

describe('SolgenQueueCustomFormulaComponent', () => {
  let component: SolgenQueueCustomFormulaComponent;
  let fixture: ComponentFixture<SolgenQueueCustomFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueCustomFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueCustomFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
