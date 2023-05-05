import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentuploadedComponent } from './documentuploaded.component';

describe('DocumentuploadedComponent', () => {
  let component: DocumentuploadedComponent;
  let fixture: ComponentFixture<DocumentuploadedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentuploadedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentuploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
