import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditdashboardwidgetComponent } from './add-editdashboardwidget.component';

describe('AddEditdashboardwidgetComponent', () => {
  let component: AddEditdashboardwidgetComponent;
  let fixture: ComponentFixture<AddEditdashboardwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditdashboardwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditdashboardwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
