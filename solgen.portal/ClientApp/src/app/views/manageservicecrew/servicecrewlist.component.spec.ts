import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecrewlistComponent } from './servicecrewlist.component';

describe('ServicecrewlistComponent', () => {
  let component: ServicecrewlistComponent;
  let fixture: ComponentFixture<ServicecrewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecrewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecrewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
