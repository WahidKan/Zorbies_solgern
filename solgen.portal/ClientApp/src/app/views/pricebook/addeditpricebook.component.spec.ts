import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditpricebookComponent } from './addeditpricebook.component';

describe('AddeditpricebookComponent', () => {
  let component: AddeditpricebookComponent;
  let fixture: ComponentFixture<AddeditpricebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditpricebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditpricebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
