import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewsStatemangementComponent } from './mobile-views-statemangement.component';

describe('MobileViewsStatemangementComponent', () => {
  let component: MobileViewsStatemangementComponent;
  let fixture: ComponentFixture<MobileViewsStatemangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileViewsStatemangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileViewsStatemangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
