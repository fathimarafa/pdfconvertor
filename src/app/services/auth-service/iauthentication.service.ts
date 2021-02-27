export interface IAuthenticationService {
    login(formData);
}

export interface ILoggedInUser {
    userid: string;
    companyId: string;
    branchId: string
}