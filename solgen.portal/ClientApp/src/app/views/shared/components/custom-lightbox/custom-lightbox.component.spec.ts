import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLightboxComponent } from './custom-lightbox.component';

describe('CustomLightboxComponent', () => {
  let component: CustomLightboxComponent;
  let fixture: ComponentFixture<CustomLightboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomLightboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
