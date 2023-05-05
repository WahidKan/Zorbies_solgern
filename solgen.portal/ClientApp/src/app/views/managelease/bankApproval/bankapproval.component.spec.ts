import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankapprovalComponent } from './bankapproval.component';

describe('BankapprovalComponent', () => {
  let component: BankapprovalComponent;
  let fixture: ComponentFixture<BankapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
