import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomescreenaddComponent } from './welcomescreenadd.component';

describe('WelcomescreenaddComponent', () => {
  let component: WelcomescreenaddComponent;
  let fixture: ComponentFixture<WelcomescreenaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomescreenaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomescreenaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
