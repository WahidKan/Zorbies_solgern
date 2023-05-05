import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationverificationComponent } from './applicationverification.component';

describe('ApplicationverificationComponent', () => {
  let component: ApplicationverificationComponent;
  let fixture: ComponentFixture<ApplicationverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
