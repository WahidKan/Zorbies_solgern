import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiespopupformComponent } from './propertiespopupform.component';

describe('PropertiespopupformComponent', () => {
  let component: PropertiespopupformComponent;
  let fixture: ComponentFixture<PropertiespopupformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiespopupformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiespopupformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
