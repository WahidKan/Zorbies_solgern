import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageinfoComponent } from './stageinfo.component';

describe('StageinfoComponent', () => {
  let component: StageinfoComponent;
  let fixture: ComponentFixture<StageinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
