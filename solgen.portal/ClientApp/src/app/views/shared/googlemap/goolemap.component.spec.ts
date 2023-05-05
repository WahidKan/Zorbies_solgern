import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoolemapComponent } from './goolemap.component';

describe('GoolemapComponent', () => {
  let component: GoolemapComponent;
  let fixture: ComponentFixture<GoolemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoolemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoolemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
