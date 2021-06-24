import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBoqEditComponent } from './manual-boq-edit.component';

describe('ManualBoqEditComponent', () => {
  let component: ManualBoqEditComponent;
  let fixture: ComponentFixture<ManualBoqEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualBoqEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualBoqEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
