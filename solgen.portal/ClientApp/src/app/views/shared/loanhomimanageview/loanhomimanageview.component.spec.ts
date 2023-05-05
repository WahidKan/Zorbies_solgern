import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanhomimanageviewComponent } from './loanhomimanageview.component';

describe('LoanhomimanageviewComponent', () => {
  let component: LoanhomimanageviewComponent;
  let fixture: ComponentFixture<LoanhomimanageviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanhomimanageviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanhomimanageviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
