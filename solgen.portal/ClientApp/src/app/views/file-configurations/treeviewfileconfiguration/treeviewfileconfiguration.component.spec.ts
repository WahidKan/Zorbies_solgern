import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeviewfileconfigurationComponent } from './treeviewfileconfiguration.component';

describe('TreeviewfileconfigurationComponent', () => {
  let component: TreeviewfileconfigurationComponent;
  let fixture: ComponentFixture<TreeviewfileconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeviewfileconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeviewfileconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
