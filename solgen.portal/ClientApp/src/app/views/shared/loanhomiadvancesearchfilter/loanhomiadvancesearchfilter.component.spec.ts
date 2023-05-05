import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanhomiadvancesearchfilterComponent } from './loanhomiadvancesearchfilter.component';

describe('LoanhomiadvancesearchfilterComponent', () => {
  let component: LoanhomiadvancesearchfilterComponent;
  let fixture: ComponentFixture<LoanhomiadvancesearchfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanhomiadvancesearchfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanhomiadvancesearchfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
