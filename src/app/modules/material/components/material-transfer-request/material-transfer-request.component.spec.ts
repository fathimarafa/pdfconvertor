import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTransferRequestComponent } from './material-transfer-request.component';

describe('MaterialTransferRequestComponent', () => {
  let component: MaterialTransferRequestComponent;
  let fixture: ComponentFixture<MaterialTransferRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTransferRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTransferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
