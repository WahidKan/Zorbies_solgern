import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceresourceviewComponent } from './serviceresourceview.component';

describe('ServiceresourceviewComponent', () => {
  let component: ServiceresourceviewComponent;
  let fixture: ComponentFixture<ServiceresourceviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceresourceviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceresourceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
