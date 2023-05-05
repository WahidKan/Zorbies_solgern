import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConditionPopupComponent } from './conditionpopup.component';


describe('SearchfilteraddComponent', () => {
  let component: ConditionPopupComponent;
  let fixture: ComponentFixture<ConditionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
