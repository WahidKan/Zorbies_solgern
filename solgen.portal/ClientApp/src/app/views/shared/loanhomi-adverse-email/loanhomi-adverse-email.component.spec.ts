import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanhomiAdverseEmailComponent } from './loanhomi-adverse-email.component';

describe('LoanhomiAdverseEmailComponent', () => {
  let component: LoanhomiAdverseEmailComponent;
  let fixture: ComponentFixture<LoanhomiAdverseEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanhomiAdverseEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanhomiAdverseEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
