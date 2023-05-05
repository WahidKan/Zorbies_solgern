import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprerequisitedocumentComponent } from './updateprerequisitedocument.component';

describe('UpdateprerequisitedocumentComponent', () => {
  let component: UpdateprerequisitedocumentComponent;
  let fixture: ComponentFixture<UpdateprerequisitedocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateprerequisitedocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprerequisitedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
