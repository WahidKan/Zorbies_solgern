import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypeaddComponent } from './usertypeadd.component';

describe('UsertypeaddComponent', () => {
  let component: UsertypeaddComponent;
  let fixture: ComponentFixture<UsertypeaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypeaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypeaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
