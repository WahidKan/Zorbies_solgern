import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaserequestformComponent } from './leaserequestform.component';

describe('LeaserequestformComponent', () => {
  let component: LeaserequestformComponent;
  let fixture: ComponentFixture<LeaserequestformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaserequestformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaserequestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
