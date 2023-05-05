import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomcontactlistComponent } from './customcontactlist.component';

describe('CustomcontactlistComponent', () => {
  let component: CustomcontactlistComponent;
  let fixture: ComponentFixture<CustomcontactlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomcontactlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomcontactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
