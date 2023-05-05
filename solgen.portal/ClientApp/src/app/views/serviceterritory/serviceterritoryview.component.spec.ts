import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceterritoryviewComponent } from './serviceterritoryview.component';

describe('ServiceterritoryviewComponent', () => {
  let component: ServiceterritoryviewComponent;
  let fixture: ComponentFixture<ServiceterritoryviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceterritoryviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceterritoryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
