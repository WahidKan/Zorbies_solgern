import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingMembersComponent } from './mapping-members.component';

describe('MappingMembersComponent', () => {
  let component: MappingMembersComponent;
  let fixture: ComponentFixture<MappingMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
