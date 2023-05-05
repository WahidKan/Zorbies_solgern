import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCrewMembersPopupComponent } from './service-crew-members-popup.component';

describe('ServiceCrewMembersPopupComponent', () => {
  let component: ServiceCrewMembersPopupComponent;
  let fixture: ComponentFixture<ServiceCrewMembersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCrewMembersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCrewMembersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
