import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IModuleMetadataService } from './imodule.metadata.service';
import { CompanyMetadata } from './metadata/company.module.metadata';
import { ProjectEnquiryMetadata } from './metadata/project-enquiry.module.metadata';

@Injectable()
export class ModuleMetadataService implements IModuleMetadataService {

  constructor(private http: HttpClient) { }

  getModuleMetadata() {
    return this.getMetadata();
  }

  getFormMetaData() {
    const isForm = true;
    return this.getMetadata(isForm);
  }

  private getMetadata(isForm?: boolean) {
    const location = window.location.pathname.split('/')[2];
    if (location) {
      switch (location) {
        case 'company':
          return this.getCompanyMetadata(isForm);
        case 'enquiry':
          return this.getProjectEnquiryMetadata(isForm);
      }
    }
  }

  //this.http.get('').toPromise()
  private getCompanyMetadata(isForm?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestedMetadata = isForm
        ? CompanyMetadata.formFields
        : CompanyMetadata;
      resolve(requestedMetadata);
    });
  }

  private getProjectEnquiryMetadata(isForm?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestedMetadata = isForm
        ? ProjectEnquiryMetadata.formFields
        : ProjectEnquiryMetadata;
      resolve(requestedMetadata);
    });
  }
}
