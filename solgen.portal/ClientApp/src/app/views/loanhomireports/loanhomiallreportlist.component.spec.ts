import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanhomiallreportlistComponent } from './loanhomiallreportlist.component';

describe('LoanhomiallreportlistComponent', () => {
  let component: LoanhomiallreportlistComponent;
  let fixture: ComponentFixture<LoanhomiallreportlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanhomiallreportlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanhomiallreportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
