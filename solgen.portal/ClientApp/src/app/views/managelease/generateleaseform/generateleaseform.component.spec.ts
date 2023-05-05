import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateleaseformComponent } from './generateleaseform.component';

describe('GenerateleaseformComponent', () => {
  let component: GenerateleaseformComponent;
  let fixture: ComponentFixture<GenerateleaseformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateleaseformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateleaseformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
