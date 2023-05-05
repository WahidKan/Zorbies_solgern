import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyleaselogComponent } from './monthlyleaselog.component';

describe('MonthlyleaselogComponent', () => {
  let component: MonthlyleaselogComponent;
  let fixture: ComponentFixture<MonthlyleaselogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyleaselogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyleaselogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
