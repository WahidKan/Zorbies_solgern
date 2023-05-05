import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranfertodealerComponent } from './tranfertodealer.component';

describe('TranfertodealerComponent', () => {
  let component: TranfertodealerComponent;
  let fixture: ComponentFixture<TranfertodealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranfertodealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranfertodealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
