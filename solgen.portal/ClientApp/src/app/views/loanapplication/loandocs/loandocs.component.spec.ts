import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoandocsComponent } from './loandocs.component';

describe('LoandocsComponent', () => {
  let component: LoandocsComponent;
  let fixture: ComponentFixture<LoandocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoandocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoandocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
