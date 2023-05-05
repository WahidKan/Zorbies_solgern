import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageleaseComponent } from './managelease.component';

describe('ManageleaseComponent', () => {
  let component: ManageleaseComponent;
  let fixture: ComponentFixture<ManageleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
