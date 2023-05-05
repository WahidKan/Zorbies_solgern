import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SFTPLogsComponent } from './sftplogs.component';

describe('SFTPLogsComponent', () => {
  let component: SFTPLogsComponent;
  let fixture: ComponentFixture<SFTPLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SFTPLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SFTPLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
