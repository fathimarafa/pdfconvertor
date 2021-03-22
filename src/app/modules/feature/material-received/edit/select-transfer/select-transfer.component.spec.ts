import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTransferComponent } from './select-transfer.component';

describe('SelectTransferComponent', () => {
  let component: SelectTransferComponent;
  let fixture: ComponentFixture<SelectTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
