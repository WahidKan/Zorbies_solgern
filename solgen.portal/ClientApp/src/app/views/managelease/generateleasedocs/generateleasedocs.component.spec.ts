import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateleasedocsComponent } from './generateleasedocs.component';

describe('GenerateleasedocsComponent', () => {
  let component: GenerateleasedocsComponent;
  let fixture: ComponentFixture<GenerateleasedocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateleasedocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateleasedocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
