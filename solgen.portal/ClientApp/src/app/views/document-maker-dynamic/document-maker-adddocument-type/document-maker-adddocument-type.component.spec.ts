import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMakerAdddocumentTypeComponent } from './document-maker-adddocument-type.component';

describe('DocumentMakerAdddocumentTypeComponent', () => {
  let component: DocumentMakerAdddocumentTypeComponent;
  let fixture: ComponentFixture<DocumentMakerAdddocumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMakerAdddocumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMakerAdddocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
