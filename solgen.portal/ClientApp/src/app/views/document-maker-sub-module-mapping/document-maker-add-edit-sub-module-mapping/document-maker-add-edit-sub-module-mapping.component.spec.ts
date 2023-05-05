import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMakerAddEditSubModuleMappingComponent } from './document-maker-add-edit-sub-module-mapping.component';

describe('DocumentMakerAddEditSubModuleMappingComponent', () => {
  let component: DocumentMakerAddEditSubModuleMappingComponent;
  let fixture: ComponentFixture<DocumentMakerAddEditSubModuleMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMakerAddEditSubModuleMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMakerAddEditSubModuleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
