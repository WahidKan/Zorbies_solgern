import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmasterlistComponent } from './formmasterlist.component';

describe('FormmasterlistComponent', () => {
  let component: FormmasterlistComponent;
  let fixture: ComponentFixture<FormmasterlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormmasterlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
