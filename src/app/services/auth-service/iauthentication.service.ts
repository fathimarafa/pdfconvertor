export interface IAuthenticationService {
    login(httpRequest, payload);
}

export interface ILoggedInUser {
    userId: number;
    companyId: number;
    branchId: number
}