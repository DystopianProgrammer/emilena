import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SystemUser } from '../model/model';

const TOKEN: string = 'em-session-token';

/**
 * Authentication is handled server-side, meaning that the authorisation neither relies on oauth or cookies, as each request
 * has the headers with the authenticated user injected. We need to allow the angular app to be aware of this, and lock down
 * features that are role based.
 */
@Injectable()
export class AuthenticationService {

    private userSubject = new BehaviorSubject<SystemUser>(new SystemUser());
    userObservable$ = this.userSubject.asObservable();

    constructor(private http: Http) { }

    /**
     * Submit method for the login form. This requests authentication using the basic method.
     */
    authenticate(user: SystemUser): Observable<SystemUser> {

        let storeSessionAuth = (response: Response): any => {
            if (response.status === 200) {
                let credentials = user.userName + ':' + user.password;
                let storageItems = {
                    'credentials': btoa(credentials),
                    'roles': response.json().roleTypes
                };
                window.sessionStorage.setItem(TOKEN, JSON.stringify(storageItems));
            }
        };

        let headers = this.secureHeader(user);
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/user/login', options)
            .map(res => {
                storeSessionAuth(res);
                return res.json() || {};
            })
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Attempts to initialise the session from the session store
     */
    restoreSession(): void {
        let token = window.sessionStorage.getItem(TOKEN);
        if (token) {
            let parsed = JSON.parse(token);
            let credentials = atob(parsed.credentials);
            let user = new SystemUser();
            user.userName = credentials.split(':')[0];
            user.password = credentials.split(':')[1];
            user.roleTypes = parsed.roles;
            this.userSubject.next(user);
        }
    }

    /**
     * Notify the application of the user in session
     */
    notify(user: SystemUser): void {
        this.userSubject.next(user);
    }

    /**
     * removes the session token
     */
    removeSessionToken(): void {
        window.sessionStorage.removeItem(TOKEN);
        this.userSubject.next(null);
    }

    /**
     * @deprecated - use Session instead - see ../session/session
     * This is requred for any http request for authentication.
     */
    secureHeader(user: SystemUser): Headers {
        let headers = new Headers();
        let credentials = user.userName + ':' + user.password;
        headers.append('Authorization', 'Basic ' + btoa(credentials));
        return headers;
    }
}