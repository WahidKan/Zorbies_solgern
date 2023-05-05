import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GethtmldocComponent } from './gethtmldoc.component';

describe('GethtmldocComponent', () => {
  let component: GethtmldocComponent;
  let fixture: ComponentFixture<GethtmldocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GethtmldocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GethtmldocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
