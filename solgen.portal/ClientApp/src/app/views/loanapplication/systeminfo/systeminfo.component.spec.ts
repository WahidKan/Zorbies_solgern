import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInfoComponent } from './systeminfo.component';

describe('CbilscoreComponent', () => {
  let component: SystemInfoComponent;
  let fixture: ComponentFixture<SystemInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
