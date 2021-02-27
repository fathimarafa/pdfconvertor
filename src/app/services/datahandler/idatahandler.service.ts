import { Observable } from "rxjs";

export interface IDataHandlerService {
    get<T>(endPoint: string): Observable<T>;
    post<T>(endPoint: string, formData): Observable<T>;
    put<T>(endPoint: string, formData): Observable<T>;
    delete<T>(endPoint: string): Observable<T>;
}

export enum HttpMethods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}