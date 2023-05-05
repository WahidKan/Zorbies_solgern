import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditlayoutComponent } from './addeditlayout.component';

describe('AddeditlayoutComponent', () => {
  let component: AddeditlayoutComponent;
  let fixture: ComponentFixture<AddeditlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
