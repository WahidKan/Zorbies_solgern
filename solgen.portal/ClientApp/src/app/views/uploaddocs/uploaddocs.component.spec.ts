import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaddocsComponent } from './uploaddocs.component';

describe('UploaddocsComponent', () => {
  let component: UploaddocsComponent;
  let fixture: ComponentFixture<UploaddocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaddocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
