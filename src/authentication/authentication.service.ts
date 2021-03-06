import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SystemUser, Staff } from '../model/model';

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

        let storeSessionAuth = (response: Response): SystemUser => {
            let systemUser = response.json();

            if (response.status === 200) {
                // minimise the association so we don't bloat the session storage
                let credentials = systemUser.userName + ':' + systemUser.password;
                let staff = new Staff();
                if (systemUser.staff) {
                    staff.id = systemUser.staff.id;
                    staff.forename = systemUser.staff.forename;
                    staff.surname = systemUser.staff.surname;
                    staff.email = systemUser.staff.email;
                } else {
                    // we have no staff association, assume admin
                    staff.forename = 'Admin';
                    staff.surname = 'Admin';
                }

                let sessionStorageItem = {
                    'credentials': btoa(credentials),
                    'roles': systemUser.roleTypes,
                    'staff': staff
                };

                systemUser.staff = staff;
                window.sessionStorage.setItem(TOKEN, JSON.stringify(sessionStorageItem));
            }
            return systemUser;
        };

        let headers = this.secureHeader(user);
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/user/login', options)
            .map(res => storeSessionAuth(res))
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Attempts to initialise the session from the session store
     */
    restoreSession(): SystemUser {
        let token = window.sessionStorage.getItem(TOKEN);
        if (token) {
            let parsed = JSON.parse(token);
            let credentials = atob(parsed.credentials);
            let user = new SystemUser();
            user.userName = credentials.split(':')[0];
            user.password = credentials.split(':')[1];
            user.roleTypes = parsed.roles;
            user.staff = parsed.staff;
            this.userSubject.next(user);
            return user;
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