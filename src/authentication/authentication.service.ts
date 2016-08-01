import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from '../model/model';

const TOKEN = 'em-token';

export enum AuthenticationStatus {
    LOGGED_IN, LOGGED_OUT
}

export class AuthenticatedUser {
    name: string;
    authenticationStatus: AuthenticationStatus;
}

class SessionStatus {
    user: string;
    error: string;
}

/**
 * Authentication is handled server-side, meaning that the authorisation neither relies on oauth or cookies, as each request
 * has the headers with the authenticated user injected. We need to allow the angular app to be aware of this, and lock down
 * features that are role based.
 */
@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }

    private authenticatedUserSource = new Subject<AuthenticatedUser>();

    authenticatedUserSource$ = this.authenticatedUserSource.asObservable();

    /**
     * Submit method for the login form. This requests authentication using the basic method.
     */
    login(user: User): Observable<User> {

        let headers = this.setHeadersWithCredentials(user);
        let options = new RequestOptions({ headers: headers });

        return this.http.get('/user/login', options)
            .map(res => res.json)
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Notify all subscribers of the authentication (login) status
     */
    notifyAuthenticationStatus(authenticatedUser: AuthenticatedUser): void {

        if (authenticatedUser.authenticationStatus === AuthenticationStatus.LOGGED_OUT) {
            sessionStorage.removeItem(TOKEN);
        }

        this.authenticatedUserSource.next(authenticatedUser);
    }

    getSessionStatus(callback: (sessionStatus: SessionStatus) => any): void {
        let token = sessionStorage.getItem(TOKEN);
        let sessionStatus = new SessionStatus();
        if (token) {
            sessionStatus.user = atob(token);
            callback(sessionStatus);
        } else {
            sessionStatus.error = 'No session for current user';
            callback(sessionStatus);
        }
    }

    createSessionToken(user: User) {
        sessionStorage.setItem(TOKEN, btoa(user.userName));
        let authenticatedUser = new AuthenticatedUser();
        authenticatedUser.name = user.userName;
        authenticatedUser.authenticationStatus = AuthenticationStatus.LOGGED_IN;
        this.authenticatedUserSource.next(authenticatedUser);
    }

    currentAuthenticationState(): AuthenticationStatus {
        return (sessionStorage.getItem(TOKEN)) ? AuthenticationStatus.LOGGED_IN : AuthenticationStatus.LOGGED_OUT;
    }

    /**
     * This is requred for any http request for authentication.
     */
    setHeadersWithCredentials(user: User): Headers {
        let headers = new Headers();
        let credentials = btoa(user.userName + ':' + user.password);
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + credentials);
        return headers;
    }
}