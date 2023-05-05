import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposallineitempopupComponent } from './proposallineitempopup.component';

describe('ProposallineitempopupComponent', () => {
  let component: ProposallineitempopupComponent;
  let fixture: ComponentFixture<ProposallineitempopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposallineitempopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposallineitempopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
