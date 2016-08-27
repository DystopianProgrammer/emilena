import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../model/model';

/**
 * Service for holding the application state
 */
@Injectable()
export class Session {

    private _sessionUser: User;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.userObservable$.subscribe(user => {
            if (user && user.userName && user.password) {
                this._sessionUser = user;
            }
        });
    }

    sessionUser(): User {
        return this._sessionUser;
    }

    /**
     * This is requred for any http request for authentication.
     */
    secureHeaders(): Headers {
        let headers = new Headers();
        let credentials = this._sessionUser.userName + ':' + this._sessionUser.password;
        headers.append('Authorization', 'Basic ' + btoa(credentials));
        return headers;
    }

}