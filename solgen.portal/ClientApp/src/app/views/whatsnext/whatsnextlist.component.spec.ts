import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsnextlistComponent } from './whatsnextlist.component';

describe('WhatsnextlistComponent', () => {
  let component: WhatsnextlistComponent;
  let fixture: ComponentFixture<WhatsnextlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsnextlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsnextlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
