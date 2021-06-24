import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDocumentTypeComponent } from './basic-document-type.component';
import { DocumentTypeEditComponent } from './edit/document-type-edit.component';



@NgModule({
  declarations: [BasicDocumentTypeComponent, DocumentTypeEditComponent],
  imports: [
    CommonModule
  ]
})
export class BasicDocumentTypeModule { }
