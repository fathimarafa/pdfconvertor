import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentGroupComponent } from './document-group.component';
import { DocumentGroupEditComponent } from './edit/document-group-edit.component';
import { DocumentTypeEditComponent } from './edit/document-type-edit.component';

@NgModule({
  declarations: [DocumentGroupComponent, DocumentGroupEditComponent, DocumentTypeEditComponent],
  imports: [
    CommonModule
  ]
})
export class DocumentGroupModule { }
