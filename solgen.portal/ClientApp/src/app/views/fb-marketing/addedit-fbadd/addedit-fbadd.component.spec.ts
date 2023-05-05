import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditFbaddComponent } from './addedit-fbadd.component';

describe('AddeditFbaddComponent', () => {
  let component: AddeditFbaddComponent;
  let fixture: ComponentFixture<AddeditFbaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditFbaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditFbaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
