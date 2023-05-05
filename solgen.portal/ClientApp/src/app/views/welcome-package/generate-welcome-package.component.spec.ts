import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateWelcomePackageComponent } from './generate-welcome-package.component';

describe('GenerateWelcomePackageComponent', () => {
  let component: GenerateWelcomePackageComponent;
  let fixture: ComponentFixture<GenerateWelcomePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateWelcomePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateWelcomePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
