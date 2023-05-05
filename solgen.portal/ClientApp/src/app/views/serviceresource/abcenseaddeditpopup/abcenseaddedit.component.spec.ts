import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcenseaddeditComponent } from './abcenseaddedit.component';

describe('AbcenseaddeditComponent', () => {
  let component: AbcenseaddeditComponent;
  let fixture: ComponentFixture<AbcenseaddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcenseaddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcenseaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
