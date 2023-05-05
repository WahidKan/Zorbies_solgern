import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleworkrequestreportComponent } from './titleworkrequestreport.component';

describe('TitleworkrequestreportComponent', () => {
  let component: TitleworkrequestreportComponent;
  let fixture: ComponentFixture<TitleworkrequestreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleworkrequestreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleworkrequestreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
