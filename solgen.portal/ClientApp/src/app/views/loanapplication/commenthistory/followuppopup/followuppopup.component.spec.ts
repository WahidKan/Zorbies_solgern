import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpPopupComponent } from './followuppopup.component';

describe('FollowUpPopupComponent', () => {
  let component: FollowUpPopupComponent;
  let fixture: ComponentFixture<FollowUpPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
