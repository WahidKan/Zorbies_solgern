import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorleaserequestlistComponent } from './vendorleaserequestlist.component';

describe('VendorleaserequestlistComponent', () => {
  let component: VendorleaserequestlistComponent;
  let fixture: ComponentFixture<VendorleaserequestlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorleaserequestlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorleaserequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
