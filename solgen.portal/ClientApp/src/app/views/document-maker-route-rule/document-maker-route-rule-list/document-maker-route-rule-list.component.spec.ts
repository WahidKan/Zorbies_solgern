import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMakerRouteRuleListComponent } from './document-maker-route-rule-list.component';

describe('DocumentMakerRouteRuleListComponent', () => {
  let component: DocumentMakerRouteRuleListComponent;
  let fixture: ComponentFixture<DocumentMakerRouteRuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMakerRouteRuleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMakerRouteRuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
