import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantermlistComponent } from './loantermlist.component';

describe('LoantermlistComponent', () => {
  let component: LoantermlistComponent;
  let fixture: ComponentFixture<LoantermlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantermlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantermlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
