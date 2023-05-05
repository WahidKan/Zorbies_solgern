import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateproductviewComponent } from './associateproductview.component';

describe('AssociateproductviewComponent', () => {
  let component: AssociateproductviewComponent;
  let fixture: ComponentFixture<AssociateproductviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateproductviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateproductviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
