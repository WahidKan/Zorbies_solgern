import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementslistComponent } from './requirementslist.component';

describe('RequirementslistComponent', () => {
  let component: RequirementslistComponent;
  let fixture: ComponentFixture<RequirementslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
