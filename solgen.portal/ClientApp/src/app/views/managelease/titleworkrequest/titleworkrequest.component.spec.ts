import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleworkrequestComponent } from './titleworkrequest.component';

describe('TitleworkrequestComponent', () => {
  let component: TitleworkrequestComponent;
  let fixture: ComponentFixture<TitleworkrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleworkrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleworkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
