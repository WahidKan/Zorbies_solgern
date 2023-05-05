import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommenthistoryComponent } from './addcommenthistory.component';

describe('AddcommenthistoryComponent', () => {
  let component: AddcommenthistoryComponent;
  let fixture: ComponentFixture<AddcommenthistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcommenthistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcommenthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
