import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricebooklistpopupComponent } from './pricebooklistpopup.component';

describe('PricebooklistpopupComponent', () => {
  let component: PricebooklistpopupComponent;
  let fixture: ComponentFixture<PricebooklistpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricebooklistpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricebooklistpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
