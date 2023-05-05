import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasstransferComponent } from './masstransfer.component';

describe('MasstransferComponent', () => {
  let component: MasstransferComponent;
  let fixture: ComponentFixture<MasstransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasstransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasstransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
