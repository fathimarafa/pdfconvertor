import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDocumentUploadComponent } from './basic-document-upload.component';
import { BasicDocumentUploadEditComponent } from './edit/basic-document-upload-edit.component';

@NgModule({
  declarations: [BasicDocumentUploadComponent, BasicDocumentUploadEditComponent],
  imports: [
    CommonModule
  ]
})
export class BasicDocumentUploadModule { }
