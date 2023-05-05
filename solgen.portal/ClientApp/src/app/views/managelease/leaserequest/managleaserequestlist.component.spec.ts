import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagleaserequestlistComponent } from './managleaserequestlist.component';

describe('ManagleaserequestlistComponent', () => {
  let component: ManagleaserequestlistComponent;
  let fixture: ComponentFixture<ManagleaserequestlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagleaserequestlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagleaserequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
