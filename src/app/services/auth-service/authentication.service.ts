import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoggedInUser, IAuthenticationService } from './iauthentication.service';

@Injectable()
export class AuthenticationService implements IAuthenticationService {

    private baseUrl: string; // service url
    private basicHeaders;
    private user;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = ''
        this.basicHeaders = {
            'Content-Type': 'application/json'
        };
        this.user = {
            userId: 1,
            companyId: 1,
            branchId: 1
        };
    }

    get loggedInUser(): ILoggedInUser {
        return this.user;
    }

    public login(formData) {
        this.httpClient.post(
            this.baseUrl, formData, { headers: new HttpHeaders(this.basicHeaders) }
        ).subscribe((res) => {
            this.user = res;
        })
    }

}