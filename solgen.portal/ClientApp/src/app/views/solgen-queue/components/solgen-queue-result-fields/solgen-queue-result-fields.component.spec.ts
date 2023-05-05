import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenQueueResultFieldsComponent } from './solgen-queue-result-fields.component';

describe('SolgenQueueResultFieldsComponent', () => {
  let component: SolgenQueueResultFieldsComponent;
  let fixture: ComponentFixture<SolgenQueueResultFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenQueueResultFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenQueueResultFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
