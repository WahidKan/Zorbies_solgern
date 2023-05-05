import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageconfigComponent } from './stageconfig.component';

describe('StageconfigComponent', () => {
  let component: StageconfigComponent;
  let fixture: ComponentFixture<StageconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
