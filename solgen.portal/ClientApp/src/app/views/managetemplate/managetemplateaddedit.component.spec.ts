import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetemplateaddeditComponent } from './managetemplateaddedit.component';

describe('ManagetemplateaddeditComponent', () => {
  let component: ManagetemplateaddeditComponent;
  let fixture: ComponentFixture<ManagetemplateaddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetemplateaddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetemplateaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
