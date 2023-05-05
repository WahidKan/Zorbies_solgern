import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiespopupComponent } from './propertiespopup.component';

describe('PropertiespopupComponent', () => {
  let component: PropertiespopupComponent;
  let fixture: ComponentFixture<PropertiespopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiespopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiespopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
