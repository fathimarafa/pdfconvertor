import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundingEditComponent } from './refunding-edit.component';

describe('RefundingEditComponent', () => {
  let component: RefundingEditComponent;
  let fixture: ComponentFixture<RefundingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
