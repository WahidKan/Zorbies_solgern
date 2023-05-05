import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingpopupComponent } from './mappingpopup.component';

describe('MappingpopupComponent', () => {
  let component: MappingpopupComponent;
  let fixture: ComponentFixture<MappingpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
