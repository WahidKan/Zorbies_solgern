import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloaddocumentComponent } from './downloaddocument.component';

describe('DownloaddocumentComponent', () => {
  let component: DownloaddocumentComponent;
  let fixture: ComponentFixture<DownloaddocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloaddocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloaddocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
