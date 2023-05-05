import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmasterComponent } from './formmaster.component';

describe('FormmasterComponent', () => {
  let component: FormmasterComponent;
  let fixture: ComponentFixture<FormmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
