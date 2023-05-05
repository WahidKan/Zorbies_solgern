import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestreportlistComponent } from './nestreportlist.component';

describe('NestreportlistComponent', () => {
  let component: NestreportlistComponent;
  let fixture: ComponentFixture<NestreportlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestreportlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestreportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
