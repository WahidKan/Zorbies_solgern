import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchfilteraddComponent } from './searchfilteradd.component';

describe('SearchfilteraddComponent', () => {
  let component: SearchfilteraddComponent;
  let fixture: ComponentFixture<SearchfilteraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchfilteraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchfilteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
