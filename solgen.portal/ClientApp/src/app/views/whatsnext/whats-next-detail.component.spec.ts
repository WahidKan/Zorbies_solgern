import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNextDetailComponent } from './whats-next-detail.component';

describe('WhatsNextDetailComponent', () => {
  let component: WhatsNextDetailComponent;
  let fixture: ComponentFixture<WhatsNextDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsNextDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsNextDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
