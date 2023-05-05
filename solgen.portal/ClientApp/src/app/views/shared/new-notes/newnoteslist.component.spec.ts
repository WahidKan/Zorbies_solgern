import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnoteslistComponent } from './newnoteslist.component';

describe('NewnoteslistComponent', () => {
  let component: NewnoteslistComponent;
  let fixture: ComponentFixture<NewnoteslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewnoteslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewnoteslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
