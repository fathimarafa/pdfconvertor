import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelConfigurationModalComponent } from './excel-configuration-modal.component';

describe('ExcelConfigurationModalComponent', () => {
  let component: ExcelConfigurationModalComponent;
  let fixture: ComponentFixture<ExcelConfigurationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelConfigurationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelConfigurationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
