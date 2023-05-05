import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingLocationsComponent } from './mapping-locations.component';

describe('MappingLocationsComponent', () => {
  let component: MappingLocationsComponent;
  let fixture: ComponentFixture<MappingLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
