import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAsTypeComponent } from './search-as-type.component';

describe('SearchAsTypeComponent', () => {
  let component: SearchAsTypeComponent;
  let fixture: ComponentFixture<SearchAsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
