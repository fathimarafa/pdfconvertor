import { Injectable } from '@angular/core';
import { ILoggedInUser, IAuthenticationService } from './iauthentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from 'src/app/modules/common/login/definitions/login.definition';

@Injectable()
export class AuthenticationService implements IAuthenticationService {

    private user;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.user = { // dummy for test
            userId: 1,
            companyId: 1,
            branchId: 2
        };
        const userdata = sessionStorage.getItem('user-session');
        if (userdata) {
            this.user = JSON.parse(userdata);
        }
    }

    get loggedInUser(): ILoggedInUser {
        return this.user;
    }

    public login(httpRequest, payload: Login) {
        httpRequest.subscribe((userId) => {
            if (userId) {
                const userdata: ILoggedInUser = {
                    userId: userId,
                    companyId: payload.companyId,
                    branchId: payload.branchId
                };
                this.user = userdata;
                sessionStorage.removeItem('user-session');
                sessionStorage.setItem("user-session", JSON.stringify(userdata));
                this.router.navigate(['/home']);
            } else {
                const message = 'LOGIN FAILED :  Wrong credentails or missing access rights to application';
                this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
            }
        })
    }

}