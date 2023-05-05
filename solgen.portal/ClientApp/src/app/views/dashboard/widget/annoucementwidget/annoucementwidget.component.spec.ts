import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoucementwidgetComponent } from './annoucementwidget.component';

describe('AnnoucementwidgetComponent', () => {
  let component: AnnoucementwidgetComponent;
  let fixture: ComponentFixture<AnnoucementwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoucementwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoucementwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
