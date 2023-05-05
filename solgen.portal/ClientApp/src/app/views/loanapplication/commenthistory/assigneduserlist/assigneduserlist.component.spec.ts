import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneduserlistComponent } from './assigneduserlist.component';

describe('AssigneduserlistComponent', () => {
  let component: AssigneduserlistComponent;
  let fixture: ComponentFixture<AssigneduserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigneduserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneduserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
