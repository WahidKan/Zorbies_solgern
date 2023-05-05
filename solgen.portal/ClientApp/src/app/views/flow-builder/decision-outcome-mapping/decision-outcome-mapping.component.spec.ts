import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionOutcomeMappingComponent } from './decision-outcome-mapping.component';

describe('DecisionOutcomeMappingComponent', () => {
  let component: DecisionOutcomeMappingComponent;
  let fixture: ComponentFixture<DecisionOutcomeMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionOutcomeMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionOutcomeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
