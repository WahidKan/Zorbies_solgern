import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProposalPopUpModelComponent } from './get-proposal-pop-up-model.component';

describe('GetProposalPopUpModelComponent', () => {
  let component: GetProposalPopUpModelComponent;
  let fixture: ComponentFixture<GetProposalPopUpModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProposalPopUpModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProposalPopUpModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
