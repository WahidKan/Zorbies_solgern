import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { accdashboard } from './accdashboard.component';

describe('accdashboard', () => {
  let component: accdashboard;
  let fixture: ComponentFixture<accdashboard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ accdashboard ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(accdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
