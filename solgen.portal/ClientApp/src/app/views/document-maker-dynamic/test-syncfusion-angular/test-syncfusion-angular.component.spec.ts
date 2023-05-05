import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSyncfusionAngularComponent } from './test-syncfusion-angular.component';

describe('TestSyncfusionAngularComponent', () => {
  let component: TestSyncfusionAngularComponent;
  let fixture: ComponentFixture<TestSyncfusionAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSyncfusionAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSyncfusionAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
