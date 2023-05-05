import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbankComponent } from './listbank.component';

describe('ListbankComponent', () => {
  let component: ListbankComponent;
  let fixture: ComponentFixture<ListbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
