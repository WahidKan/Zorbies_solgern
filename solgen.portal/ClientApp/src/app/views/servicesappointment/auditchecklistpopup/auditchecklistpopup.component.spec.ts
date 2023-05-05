import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditchecklistpopupComponent } from './auditchecklistpopup.component';

describe('AuditchecklistpopupComponent', () => {
  let component: AuditchecklistpopupComponent;
  let fixture: ComponentFixture<AuditchecklistpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditchecklistpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditchecklistpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
