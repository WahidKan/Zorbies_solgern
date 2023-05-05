import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyLinkModalComponent } from './copy-link-modal.component';

describe('CopyLinkModalComponent', () => {
  let component: CopyLinkModalComponent;
  let fixture: ComponentFixture<CopyLinkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyLinkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
