import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolStageconfigurationComponent } from './sol-stageconfiguration.component';

describe('SolStageconfigurationComponent', () => {
  let component: SolStageconfigurationComponent;
  let fixture: ComponentFixture<SolStageconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolStageconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolStageconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
