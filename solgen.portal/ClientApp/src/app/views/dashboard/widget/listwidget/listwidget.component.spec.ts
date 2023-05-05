import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListwidgetComponent } from './listwidget.component';

describe('ListwidgetComponent', () => {
  let component: ListwidgetComponent;
  let fixture: ComponentFixture<ListwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
