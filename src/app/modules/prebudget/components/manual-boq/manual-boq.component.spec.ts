import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBoqComponent } from './manual-boq.component';

describe('ManualBoqComponent', () => {
  let component: ManualBoqComponent;
  let fixture: ComponentFixture<ManualBoqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualBoqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
