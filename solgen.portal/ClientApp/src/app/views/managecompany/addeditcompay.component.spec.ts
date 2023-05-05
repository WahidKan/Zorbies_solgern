import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditcompayComponent } from './addeditcompay.component';

describe('AddeditcompayComponent', () => {
  let component: AddeditcompayComponent;
  let fixture: ComponentFixture<AddeditcompayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditcompayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditcompayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
