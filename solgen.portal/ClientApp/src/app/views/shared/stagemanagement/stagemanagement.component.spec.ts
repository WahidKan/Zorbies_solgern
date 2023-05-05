import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagemanagementComponent } from './stagemanagement.component';

describe('StagemanagementComponent', () => {
  let component: StagemanagementComponent;
  let fixture: ComponentFixture<StagemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
