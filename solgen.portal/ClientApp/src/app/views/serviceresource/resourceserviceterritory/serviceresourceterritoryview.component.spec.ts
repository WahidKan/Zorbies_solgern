import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceresourceterritoryviewComponent } from './serviceresourceterritoryview.component';

describe('ServiceresourceterritoryviewComponent', () => {
  let component: ServiceresourceterritoryviewComponent;
  let fixture: ComponentFixture<ServiceresourceterritoryviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceresourceterritoryviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceresourceterritoryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
