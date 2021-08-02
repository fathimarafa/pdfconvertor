import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubContractorIndentApprovalnewComponent } from './subcontractorindent-approval-new.component';

describe('SubContractorIndentApprovalnewComponent', () => {
  let component: SubContractorIndentApprovalnewComponent;
  let fixture: ComponentFixture<SubContractorIndentApprovalnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubContractorIndentApprovalnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubContractorIndentApprovalnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
