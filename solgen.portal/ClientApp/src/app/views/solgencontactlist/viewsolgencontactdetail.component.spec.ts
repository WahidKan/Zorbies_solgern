import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsolgencontactdetailComponent } from './viewsolgencontactdetail.component';

describe('ViewsolgencontactdetailComponent', () => {
  let component: ViewsolgencontactdetailComponent;
  let fixture: ComponentFixture<ViewsolgencontactdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsolgencontactdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsolgencontactdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
