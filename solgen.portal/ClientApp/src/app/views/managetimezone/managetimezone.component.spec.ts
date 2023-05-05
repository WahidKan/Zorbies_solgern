import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetimezoneComponent } from './managetimezone.component';

describe('ManagetimezoneComponent', () => {
  let component: ManagetimezoneComponent;
  let fixture: ComponentFixture<ManagetimezoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetimezoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetimezoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
