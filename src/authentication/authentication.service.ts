import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

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
    updateAuthenticationStatus(authenticatedUser: AuthenticatedUser): void {
        sessionStorage.removeItem(TOKEN);
        this.authenticatedUserSource.next(authenticatedUser);
        this.authenticatedUserSource.complete();
    }

    hasSession(): boolean {
        return sessionStorage.getItem(TOKEN);
    }

    createSessionToken(user: User) {
        sessionStorage.setItem(TOKEN, btoa(user.userName + ':' + user.password));
        this.broadCastUser(user);
    }

    broadCastUser(user: User): void {
        let authenticatedUser = new AuthenticatedUser();
        authenticatedUser.name = user.userName;
        authenticatedUser.authenticationStatus = AuthenticationStatus.LOGGED_IN;
        this.authenticatedUserSource.next(authenticatedUser);
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