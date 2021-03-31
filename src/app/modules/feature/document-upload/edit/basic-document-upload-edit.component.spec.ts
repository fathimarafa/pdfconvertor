import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDocumentUploadEditComponent } from './basic-document-upload-edit.component';

describe('BasicDocumentUploadEditComponent', () => {
  let component: BasicDocumentUploadEditComponent;
  let fixture: ComponentFixture<BasicDocumentUploadEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDocumentUploadEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDocumentUploadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
