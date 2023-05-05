import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsettingComponent } from './configurationsetting.component';

describe('ConfigurationsettingComponent', () => {
  let component: ConfigurationsettingComponent;
  let fixture: ComponentFixture<ConfigurationsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
