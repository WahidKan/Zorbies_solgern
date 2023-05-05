import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderWhiteComponent } from './loader-white.component';

describe('LoaderWhiteComponent', () => {
  let component: LoaderWhiteComponent;
  let fixture: ComponentFixture<LoaderWhiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderWhiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
