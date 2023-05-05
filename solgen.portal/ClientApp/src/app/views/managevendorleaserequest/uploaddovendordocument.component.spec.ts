import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaddovendordocumentComponent } from './uploaddovendordocument.component';

describe('UploaddovendordocumentComponent', () => {
  let component: UploaddovendordocumentComponent;
  let fixture: ComponentFixture<UploaddovendordocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaddovendordocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddovendordocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
