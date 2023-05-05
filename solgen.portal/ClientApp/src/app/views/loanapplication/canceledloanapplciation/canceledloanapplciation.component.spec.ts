import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledloanapplciationComponent } from './canceledloanapplciation.component';

describe('CanceledloanapplciationComponent', () => {
  let component: CanceledloanapplciationComponent;
  let fixture: ComponentFixture<CanceledloanapplciationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceledloanapplciationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledloanapplciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
