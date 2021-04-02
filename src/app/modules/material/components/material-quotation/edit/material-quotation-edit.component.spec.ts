import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialQuotationEditComponent } from './material-quotation-edit.component';

describe('MaterialQuotationEditComponent', () => {
  let component: MaterialQuotationEditComponent;
  let fixture: ComponentFixture<MaterialQuotationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialQuotationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialQuotationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
