import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleforcesyncstatuslistComponent } from './saleforcesyncstatuslist.component';

describe('SaleforcesyncstatuslistComponent', () => {
  let component: SaleforcesyncstatuslistComponent;
  let fixture: ComponentFixture<SaleforcesyncstatuslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleforcesyncstatuslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleforcesyncstatuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
