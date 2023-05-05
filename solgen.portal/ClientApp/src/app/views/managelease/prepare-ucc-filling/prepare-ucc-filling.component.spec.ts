import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareUccFillingComponent } from './prepare-ucc-filling.component';

describe('PrepareUccFillingComponent', () => {
  let component: PrepareUccFillingComponent;
  let fixture: ComponentFixture<PrepareUccFillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareUccFillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareUccFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
