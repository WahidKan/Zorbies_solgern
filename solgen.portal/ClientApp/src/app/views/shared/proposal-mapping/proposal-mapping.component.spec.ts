import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalMappingComponent } from './proposal-mapping.component';

describe('MappingLocationsComponent', () => {
  let component: ProposalMappingComponent;
  let fixture: ComponentFixture<ProposalMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
