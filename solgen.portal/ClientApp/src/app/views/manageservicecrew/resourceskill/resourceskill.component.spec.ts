import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceskillComponent } from './resourceskill.component';

describe('ResourceskillComponent', () => {
  let component: ResourceskillComponent;
  let fixture: ComponentFixture<ResourceskillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceskillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
