import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { AuthenticationService } from '../authentication/authentication.service';
import { SystemUser } from '../model/model';

/**
 * Service for holding the application state
 */
@Injectable()
export class Session {

    private _sessionUser: SystemUser;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.userObservable$.subscribe(user => {
            if (user && user.userName) {
                this._sessionUser = user;
            }
        });
    }

    sessionUser(): SystemUser {
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

    /**
     * This is requred for any http request for authentication with appended json content type
     */
    secureJSONHeaders(): Headers {
        let headers = new Headers();
        let credentials = this._sessionUser.userName + ':' + this._sessionUser.password;
        headers.append('Authorization', 'Basic ' + btoa(credentials));
        headers.append('Content-Type', 'application/json');
        return headers;
    }

}