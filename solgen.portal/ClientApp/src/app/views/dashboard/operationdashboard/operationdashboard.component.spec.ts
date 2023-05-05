import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationdashboardComponent } from './operationdashboard.component';

describe('OperationdashboardComponent', () => {
  let component: OperationdashboardComponent;
  let fixture: ComponentFixture<OperationdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
