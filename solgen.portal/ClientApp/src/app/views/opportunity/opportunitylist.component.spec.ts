import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OpportunityListComponent } from './opportunitylist.component';

//import { OpportunitylistComponent } from './opportunitylist.component';

describe('OpportunitylistComponent', () => {
  let component: OpportunityListComponent;
  let fixture: ComponentFixture<OpportunityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
