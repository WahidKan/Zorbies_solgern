import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMakerListComponent } from './document-maker-list.component';

describe('DocumentMakerListComponent', () => {
  let component: DocumentMakerListComponent;
  let fixture: ComponentFixture<DocumentMakerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMakerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMakerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
