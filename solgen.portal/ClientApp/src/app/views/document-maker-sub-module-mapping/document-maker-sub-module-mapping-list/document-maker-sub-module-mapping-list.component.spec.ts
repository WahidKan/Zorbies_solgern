import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMakerSubModuleMappingListComponent } from './document-maker-sub-module-mapping-list.component';

describe('DocumentMakerSubModuleMappingListComponent', () => {
  let component: DocumentMakerSubModuleMappingListComponent;
  let fixture: ComponentFixture<DocumentMakerSubModuleMappingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMakerSubModuleMappingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMakerSubModuleMappingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
