import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageworkorderComponent } from './manageworkorder.component';

describe('ManageworkorderComponent', () => {
  let component: ManageworkorderComponent;
  let fixture: ComponentFixture<ManageworkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageworkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageworkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
