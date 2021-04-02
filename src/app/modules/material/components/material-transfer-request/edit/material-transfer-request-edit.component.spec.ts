import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTransferRequestEditComponent } from './material-transfer-request-edit.component';

describe('MaterialTransferRequestEditComponent', () => {
  let component: MaterialTransferRequestEditComponent;
  let fixture: ComponentFixture<MaterialTransferRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTransferRequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTransferRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
