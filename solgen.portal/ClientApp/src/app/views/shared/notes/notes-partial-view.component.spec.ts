import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPartialViewComponent } from './notes-partial-view.component';

describe('NotesPartialViewComponent', () => {
  let component: NotesPartialViewComponent;
  let fixture: ComponentFixture<NotesPartialViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesPartialViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesPartialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
