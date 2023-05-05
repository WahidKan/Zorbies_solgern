import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbilscoreComponent } from './cbilscore.component';

describe('CbilscoreComponent', () => {
  let component: CbilscoreComponent;
  let fixture: ComponentFixture<CbilscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbilscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbilscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
