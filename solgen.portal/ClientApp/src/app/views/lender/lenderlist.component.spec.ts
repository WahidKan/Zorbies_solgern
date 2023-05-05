import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderlistComponent } from './lenderlist.component';

describe('LenderlistComponent', () => {
  let component: LenderlistComponent;
  let fixture: ComponentFixture<LenderlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
