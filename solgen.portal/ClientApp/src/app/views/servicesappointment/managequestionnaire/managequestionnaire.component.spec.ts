import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagequestionnaireComponent } from './managequestionnaire.component';

describe('ManagequestionnaireComponent', () => {
  let component: ManagequestionnaireComponent;
  let fixture: ComponentFixture<ManagequestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagequestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagequestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
