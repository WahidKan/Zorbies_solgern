import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolgenInputComponent } from './solgen-input.component';

describe('SolgenInputComponent', () => {
  let component: SolgenInputComponent;
  let fixture: ComponentFixture<SolgenInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolgenInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolgenInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
