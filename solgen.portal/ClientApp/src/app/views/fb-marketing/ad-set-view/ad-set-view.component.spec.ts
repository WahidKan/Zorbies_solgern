import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSetViewComponent } from './ad-set-view.component';

describe('AdSetViewComponent', () => {
  let component: AdSetViewComponent;
  let fixture: ComponentFixture<AdSetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSetViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
