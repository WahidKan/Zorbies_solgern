import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdocumentlistComponent } from './customerdocumentlist.component';

describe('CustomerdocumentlistComponent', () => {
  let component: CustomerdocumentlistComponent;
  let fixture: ComponentFixture<CustomerdocumentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerdocumentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdocumentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
