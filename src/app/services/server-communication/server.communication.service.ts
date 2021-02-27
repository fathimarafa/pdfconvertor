import { Injectable } from '@angular/core';
import { IServerCommunicationService } from './iserver.communication.service';
import { CompanyDummyData } from './dummy-data/company.data';
import { SideNavigationMenu } from './dummy-data/sidebar.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class ServerCommunicationService implements IServerCommunicationService {

  baseUrl: string; // service url
  basicHeaders;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = ''
    this.basicHeaders = {
      'Content-Type': 'application/json'
    };
  }

  fetchData() {
    const endPoint = this.getEndPoint();
    if (endPoint) {
      switch (endPoint) {
        case 'company':
          return this.getCompanyData();
        case 'enquiry':
          return this.getCompanyData();
      }
    }
  }

  private getCompanyData(): Promise<any[]> {
    //this.httpClient.get('').toPromise()
    return new Promise((resolve, reject) => {
      resolve(CompanyDummyData);
    });
  }

  getSideNavigationMenuDetials(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      resolve(SideNavigationMenu);
    });
  }


  private getEndPoint(): string {
    return window.location.pathname.split('/')[2];
  }

  saveData(formData): Promise<any> {
    const endPoint = this.getEndPoint();
    return this.httpClient.post(
      this.baseUrl,
      formData,
      { headers: new HttpHeaders(this.basicHeaders) }
    ).toPromise();
  }

  updateData(formData): Promise<any> {
    const endPoint = this.getEndPoint();
    return this.httpClient.put(
      this.baseUrl,
      formData,
      { headers: new HttpHeaders(this.basicHeaders) }
    ).toPromise();
  }

  deleteData(): Promise<any> {
    const endPoint = this.getEndPoint();
    return this.httpClient.delete(this.baseUrl).toPromise();
  }

}
