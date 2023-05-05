import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewsComponent } from './mobile-views.component';

describe('MobileViewsComponent', () => {
  let component: MobileViewsComponent;
  let fixture: ComponentFixture<MobileViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
