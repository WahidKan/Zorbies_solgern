import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalviewComponent } from './proposalview.component';

describe('ProposalviewComponent', () => {
  let component: ProposalviewComponent;
  let fixture: ComponentFixture<ProposalviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
