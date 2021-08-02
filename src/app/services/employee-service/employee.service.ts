import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRegistrationMetadata } from 'src/app/modules/hr/components/employee-registration/employee-registration.configuration';
import { AuthenticationService } from '../auth-service/authentication.service';
import { DataHandlerService } from '../datahandler/datahandler.service';
import { EmployeeCategory, EmployeeDesignation, IEmployeeService } from './iemployee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements IEmployeeService {

  constructor(
    private dataprovider: DataHandlerService,
    private authService: AuthenticationService
  ) { }

  private get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${EmployeeRegistrationMetadata.serviceEndPoint}List/${user.companyId}/${user.branchId}`;
  }

  getLabour(): Observable<EmployeeDesignation[]> {
    const endPoint = `${this.serviceUrl}/${EmployeeCategory.LABOUR}`
    return this.dataprovider.get(endPoint)
  }

  getGroupLabour(): Observable<EmployeeDesignation[]> {
    const endPoint = `${this.serviceUrl}/${EmployeeCategory.GROUPLABOUR}`
    return this.dataprovider.get(endPoint)
  }

  getContractor(): Observable<EmployeeDesignation[]> {
    const endPoint = `${this.serviceUrl}/${EmployeeCategory.CONTRACTOR}`
    return this.dataprovider.get(endPoint)
  }

  getSubContractor(): Observable<EmployeeDesignation[]> {
    const endPoint = `${this.serviceUrl}/${EmployeeCategory.SUBCONTRACTOR}`
    return this.dataprovider.get(endPoint)
  }

  getForeman(): Observable<EmployeeDesignation[]> {
    const endPoint = `${this.serviceUrl}/${EmployeeCategory.FOREMAN}`
    return this.dataprovider.get(endPoint)
  }

  getSiteManager(): Observable<EmployeeDesignation[]> {
    const endPoint = `${this.serviceUrl}/${EmployeeCategory.SITEMANAGER}`
    return this.dataprovider.get(endPoint)
  }

  getMonthlySalaried(): Observable<EmployeeDesignation[]> {
    const endPoint = `${this.serviceUrl}/${EmployeeCategory.MONTHLYSALARIED}`
    return this.dataprovider.get(endPoint)
  }


}
