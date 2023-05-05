import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasedocsComponent } from './leasedocs.component';

describe('LeasedocsComponent', () => {
  let component: LeasedocsComponent;
  let fixture: ComponentFixture<LeasedocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasedocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasedocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
