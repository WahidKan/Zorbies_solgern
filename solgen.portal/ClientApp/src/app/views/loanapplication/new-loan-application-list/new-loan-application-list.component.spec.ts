import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoanApplicationListComponent } from './new-loan-application-list.component';

describe('NewLoanApplicationListComponent', () => {
  let component: NewLoanApplicationListComponent;
  let fixture: ComponentFixture<NewLoanApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLoanApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLoanApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
