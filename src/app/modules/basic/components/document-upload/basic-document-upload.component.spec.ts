import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDocumentUploadComponent } from './basic-document-upload.component';

describe('BasicDocumentUploadComponent', () => {
  let component: BasicDocumentUploadComponent;
  let fixture: ComponentFixture<BasicDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDocumentUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
