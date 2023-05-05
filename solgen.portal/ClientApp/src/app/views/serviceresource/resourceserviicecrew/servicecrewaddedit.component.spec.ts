import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecrewaddeditComponent } from './servicecrewaddedit.component';

describe('ServicecrewaddeditComponent', () => {
  let component: ServicecrewaddeditComponent;
  let fixture: ComponentFixture<ServicecrewaddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecrewaddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecrewaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
