import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialQuotationComponent } from './material-quotation.component';

describe('MaterialQuotationComponent', () => {
  let component: MaterialQuotationComponent;
  let fixture: ComponentFixture<MaterialQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
