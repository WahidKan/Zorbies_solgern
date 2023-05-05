import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanviewpopupComponent } from './kanbanviewpopup.component';

describe('KanbanviewpopupComponent', () => {
  let component: KanbanviewpopupComponent;
  let fixture: ComponentFixture<KanbanviewpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanviewpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanviewpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
