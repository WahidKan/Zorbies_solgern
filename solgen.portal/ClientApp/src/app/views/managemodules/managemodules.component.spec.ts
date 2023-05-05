import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemodulesComponent } from './managemodules.component';

describe('ManagemodulesComponent', () => {
  let component: ManagemodulesComponent;
  let fixture: ComponentFixture<ManagemodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
