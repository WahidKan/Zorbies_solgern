import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlBuilderformComponent } from './html-builderform.component';

describe('HtmlBuilderformComponent', () => {
  let component: HtmlBuilderformComponent;
  let fixture: ComponentFixture<HtmlBuilderformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlBuilderformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlBuilderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
