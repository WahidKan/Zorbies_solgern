import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRoutingComponent } from './data-routing.component';

describe('DataRoutingComponent', () => {
  let component: DataRoutingComponent;
  let fixture: ComponentFixture<DataRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
