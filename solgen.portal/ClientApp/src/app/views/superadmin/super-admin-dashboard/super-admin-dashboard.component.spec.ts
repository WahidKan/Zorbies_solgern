import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtheruserdashboardComponent } from './otheruserdashboard.component';

describe('OtheruserdashboardComponent', () => {
  let component: OtheruserdashboardComponent;
  let fixture: ComponentFixture<OtheruserdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtheruserdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtheruserdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
