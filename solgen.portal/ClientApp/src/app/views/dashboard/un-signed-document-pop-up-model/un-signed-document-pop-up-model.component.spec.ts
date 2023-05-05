import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSignedDocumentPopUpModelComponent } from './un-signed-document-pop-up-model.component';

describe('UnSignedDocumentPopUpModelComponent', () => {
  let component: UnSignedDocumentPopUpModelComponent;
  let fixture: ComponentFixture<UnSignedDocumentPopUpModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnSignedDocumentPopUpModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnSignedDocumentPopUpModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
