import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasternameListComponent } from './mastername-list.component';

describe('MasternameListComponent', () => {
  let component: MasternameListComponent;
  let fixture: ComponentFixture<MasternameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasternameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasternameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
