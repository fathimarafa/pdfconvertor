import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { IDataHandlerService, HttpMethods } from './idatahandler.service';
import { AuthenticationService } from "../auth-service/authentication.service";
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from './../../../environments/environment';

@Injectable()
export class DataHandlerService implements IDataHandlerService {

    baseUrl = environment.baseUrl
    basicHeaders: any;

    constructor(
        private httpClient: HttpClient,
        private authService: AuthenticationService,
        private snackBar: MatSnackBar
    ) {
        //this.baseUrl = 'http://167.86.72.223/BuildExeCRM/api/';
        this.basicHeaders = {
            'Content-Type': 'application/json'
        };
    }

    get<T>(endPoint: string): Observable<T> {
        const url = `${this.baseUrl}${endPoint}`;
        return this.httpClient.get<T>(url).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    post<T>(endPoint: string, formData): Observable<T> {
        const url = `${this.baseUrl}${endPoint}`;
        // if (endPoint.toLowerCase() !== 'company') {
        //     formData = { ...formData }
        // }
        return this.httpClient.post<T>(
            url,
            formData,
            { headers: new HttpHeaders(this.basicHeaders) }
        ).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    put<T>(endPoint: string, formData): Observable<T> {
        const url = `${this.baseUrl}${endPoint}`;
        return this.httpClient.put<T>(
            url,
            formData,
            { headers: new HttpHeaders(this.basicHeaders) }
        ).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    delete<T>(endPoint: string): Observable<T> {
        const url = `${this.baseUrl}${endPoint}`;
        return this.httpClient.delete<T>(url).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        const message = 'ERROR : Unable to connect to service , please try again later';
        this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
        return throwError(message);
    }

}