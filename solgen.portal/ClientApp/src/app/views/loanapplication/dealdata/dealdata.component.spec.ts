import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealdataComponent } from './dealdata.component';

describe('DealdataComponent', () => {
  let component: DealdataComponent;
  let fixture: ComponentFixture<DealdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
