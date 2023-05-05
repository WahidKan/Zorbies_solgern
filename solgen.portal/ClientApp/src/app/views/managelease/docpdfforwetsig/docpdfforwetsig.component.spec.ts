import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { docpdfforwetsigComponent } from './docpdfforwetsig.component';

describe('GenerateleasedocsComponent', () => {
  let component: docpdfforwetsigComponent;
  let fixture: ComponentFixture<docpdfforwetsigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [docpdfforwetsigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(docpdfforwetsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
