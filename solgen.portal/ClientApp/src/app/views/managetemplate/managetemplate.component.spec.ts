import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetemplateComponent } from './managetemplate.component';

describe('ManagetemplateComponent', () => {
  let component: ManagetemplateComponent;
  let fixture: ComponentFixture<ManagetemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
