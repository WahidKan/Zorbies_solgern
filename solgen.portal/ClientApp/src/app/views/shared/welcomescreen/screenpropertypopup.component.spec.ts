import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenpropertypopupComponent } from './screenpropertypopup.component';

describe('ScreenpropertypopupComponent', () => {
  let component: ScreenpropertypopupComponent;
  let fixture: ComponentFixture<ScreenpropertypopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenpropertypopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenpropertypopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
