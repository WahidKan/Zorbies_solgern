import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsMasterComponent } from './documents-master.component';

describe('DocumentsMasterComponent', () => {
  let component: DocumentsMasterComponent;
  let fixture: ComponentFixture<DocumentsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
