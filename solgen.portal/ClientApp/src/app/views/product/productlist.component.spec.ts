import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListService } from './productlist.service';
import { ProductListComponent } from './productlist.component';

//import { OpportunitylistComponent } from './opportunitylist.component';

describe('OpportunitylistComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
