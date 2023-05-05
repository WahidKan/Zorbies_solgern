import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesuploadComponent } from './filesupload.component';

describe('FileuploadComponent', () => {
  let component: FilesuploadComponent;
  let fixture: ComponentFixture<FilesuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
