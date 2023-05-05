import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDocumentMakerRouteRuleComponent } from './add-edit-document-maker-route-rule.component';

describe('AddEditDocumentMakerRouteRuleComponent', () => {
  let component: AddEditDocumentMakerRouteRuleComponent;
  let fixture: ComponentFixture<AddEditDocumentMakerRouteRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDocumentMakerRouteRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDocumentMakerRouteRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
