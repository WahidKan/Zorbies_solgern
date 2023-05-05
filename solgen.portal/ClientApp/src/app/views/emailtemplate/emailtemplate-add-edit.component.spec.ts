import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtemplateAddEditComponent } from './emailtemplate-add-edit.component';

describe('EmailtemplateAddEditComponent', () => {
  let component: EmailtemplateAddEditComponent;
  let fixture: ComponentFixture<EmailtemplateAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtemplateAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtemplateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
