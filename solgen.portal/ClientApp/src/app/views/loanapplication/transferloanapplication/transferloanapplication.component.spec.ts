import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferloanapplicationComponent } from './transferloanapplication.component';

describe('TransferloanapplicationComponent', () => {
  let component: TransferloanapplicationComponent;
  let fixture: ComponentFixture<TransferloanapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferloanapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferloanapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
