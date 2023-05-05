import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallerrepComponent } from './installerrep.component';

describe('InstallerrepComponent', () => {
  let component: InstallerrepComponent;
  let fixture: ComponentFixture<InstallerrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallerrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallerrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
