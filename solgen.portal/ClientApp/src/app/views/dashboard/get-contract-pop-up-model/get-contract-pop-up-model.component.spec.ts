import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetContractPopUpModelComponent } from './get-contract-pop-up-model.component';

describe('GetContractPopUpModelComponent', () => {
  let component: GetContractPopUpModelComponent;
  let fixture: ComponentFixture<GetContractPopUpModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetContractPopUpModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetContractPopUpModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
