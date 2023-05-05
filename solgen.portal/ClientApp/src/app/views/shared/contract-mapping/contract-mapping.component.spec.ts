import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMappingComponent } from './contract-mapping.component';

describe('ContractMappingComponent', () => {
  let component: ContractMappingComponent;
  let fixture: ComponentFixture<ContractMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
