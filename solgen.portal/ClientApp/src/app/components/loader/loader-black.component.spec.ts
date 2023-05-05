import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBlackComponent } from './loader-black.component';

describe('LoaderBlackComponent', () => {
  let component: LoaderBlackComponent;
  let fixture: ComponentFixture<LoaderBlackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderBlackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
