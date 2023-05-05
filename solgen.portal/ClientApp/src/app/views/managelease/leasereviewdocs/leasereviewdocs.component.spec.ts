import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasereviewdocsComponent } from './leasereviewdocs.component';

describe('LeasereviewdocsComponent', () => {
  let component: LeasereviewdocsComponent;
  let fixture: ComponentFixture<LeasereviewdocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasereviewdocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasereviewdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
