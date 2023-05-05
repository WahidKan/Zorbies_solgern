import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditFbaddSetComponent } from './addedit-fbadd-set.component';

describe('AddeditFbaddSetComponent', () => {
  let component: AddeditFbaddSetComponent;
  let fixture: ComponentFixture<AddeditFbaddSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditFbaddSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditFbaddSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
