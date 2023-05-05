import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditvendorComponent } from './addeditvendor.component';

describe('AddeditvendorComponent', () => {
  let component: AddeditvendorComponent;
  let fixture: ComponentFixture<AddeditvendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditvendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
