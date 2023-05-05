import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasternameComponent } from './mastername.component';

describe('MasternameComponent', () => {
  let component: MasternameComponent;
  let fixture: ComponentFixture<MasternameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasternameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasternameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
