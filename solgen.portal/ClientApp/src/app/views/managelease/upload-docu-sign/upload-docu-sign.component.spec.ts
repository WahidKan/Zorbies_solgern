import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocuSignComponent } from './upload-docu-sign.component';

describe('UploadDocuSignComponent', () => {
  let component: UploadDocuSignComponent;
  let fixture: ComponentFixture<UploadDocuSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDocuSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocuSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
