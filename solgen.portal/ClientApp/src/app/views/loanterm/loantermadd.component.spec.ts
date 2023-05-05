import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantermaddComponent } from './loantermadd.component';

describe('LoantermaddComponent', () => {
  let component: LoantermaddComponent;
  let fixture: ComponentFixture<LoantermaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantermaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantermaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
